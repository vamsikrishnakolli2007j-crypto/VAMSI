# ScamShield AI - PowerShell Backend Server
param(
    [int]$Port = 5000
)

$rootDir = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path "$rootDir\index.html")) {
    $rootDir = $PSScriptRoot
}

Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "    SCAMSHIELD AI - POWERSHELL SERVER LISTENER        " -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "[+] Web Root: $rootDir" -ForegroundColor Green
Write-Host "[+] Listening at: http://localhost:$Port/" -ForegroundColor Green

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
} catch {
    Write-Host "[-] Failed to start listener: $_" -ForegroundColor Red
    exit 1
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        $response.AddHeader("Access-Control-Allow-Headers", "Content-Type")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        $rawUrl = $request.Url.AbsolutePath

        if ($rawUrl -eq "/api/health") {
            $response.ContentType = "application/json; charset=utf-8"
            $hasAi = if ($env:GEMINI_API_KEY) { "true" } else { "false" }
            $json = "{`"status`":`"healthy`",`"engine`":`"ScamShield PS Engine v2.4`",`"ai_enabled`":$hasAi}"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
            continue
        }

        if ($rawUrl -eq "/" -or [string]::IsNullOrEmpty($rawUrl)) {
            $rawUrl = "/index.html"
        }

        $filePath = Join-Path $rootDir ($rawUrl.TrimStart("/").Replace("/", "\"))
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $response.ContentType = $mime

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
        } else {
            $response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("File Not Found")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
        }
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
