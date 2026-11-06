@echo off
title ScamShield AI - Server Launcher
cd /d "%~dp0"

echo ======================================================
echo    Starting ScamShield AI - Cyber Threat Checker      
echo ======================================================

if not exist "server\ScamShieldServer.exe" (
    echo [i] Compiling ScamShieldServer.exe using csc.exe...
    "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe" /nologo /codepage:65001 /out:"server\ScamShieldServer.exe" "server\ScamShieldServer.cs"
)

echo [+] Starting server on http://localhost:5000...
start "" "server\ScamShieldServer.exe"

timeout /t 1 >nul
echo [+] Opening web browser...
start http://localhost:5000/

echo.
echo [✓] ScamShield AI is now running!
echo [i] Leave the server console window open while testing.
pause
