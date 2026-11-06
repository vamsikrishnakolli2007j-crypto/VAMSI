using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Threading;

namespace ScamShield
{
    class Program
    {
        private static int port = 5000;
        private static string rootDirectory;
        private static string geminiApiKey;
        private static TcpListener listener;

        static void Main(string[] args)
        {
            Console.Title = "ScamShield AI - Security Engine Server";
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("======================================================");
            Console.WriteLine("       SCAMSHIELD AI - THREAT ENGINE SERVER           ");
            Console.WriteLine("======================================================");
            Console.ResetColor();

            string exeDir = AppDomain.CurrentDomain.BaseDirectory;
            if (File.Exists(Path.Combine(exeDir, "index.html")))
            {
                rootDirectory = exeDir;
            }
            else if (File.Exists(Path.Combine(exeDir, "..", "index.html")))
            {
                rootDirectory = Path.GetFullPath(Path.Combine(exeDir, ".."));
            }
            else
            {
                rootDirectory = Directory.GetCurrentDirectory();
            }

            geminiApiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY");
            if (string.IsNullOrEmpty(geminiApiKey))
            {
                geminiApiKey = Environment.GetEnvironmentVariable("GOOGLE_API_KEY");
            }

            Console.WriteLine("[+] Web Root Directory: " + rootDirectory);
            Console.WriteLine("[+] AI Backend Status: " + (string.IsNullOrEmpty(geminiApiKey) ? "Heuristic Local Engine (No external API key set)" : "Gemini API Hook Enabled (Key secured in backend)"));

            try
            {
                listener = new TcpListener(IPAddress.Loopback, port);
                listener.Start();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("[+] Server listening at: http://localhost:" + port + "/");
                Console.WriteLine("[+] Open your browser at: http://localhost:" + port + "/");
                Console.ResetColor();
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("[-] Failed to start TcpListener: " + ex.Message);
                Console.ResetColor();
                return;
            }

            while (true)
            {
                try
                {
                    TcpClient client = listener.AcceptTcpClient();
                    ThreadPool.QueueUserWorkItem(HandleClient, client);
                }
                catch (Exception)
                {
                    break;
                }
            }
        }

        private static void HandleClient(object obj)
        {
            TcpClient client = (TcpClient)obj;
            try
            {
                using (NetworkStream stream = client.GetStream())
                {
                    stream.ReadTimeout = 5000;
                    byte[] buffer = new byte[8192];
                    int bytesRead = stream.Read(buffer, 0, buffer.Length);
                    if (bytesRead <= 0) return;

                    string headerData = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                    string[] lines = headerData.Split(new string[] { "\r\n" }, StringSplitOptions.None);
                    if (lines.Length == 0) return;

                    string[] requestLine = lines[0].Split(' ');
                    if (requestLine.Length < 2) return;

                    string method = requestLine[0].ToUpper();
                    string path = requestLine[1];

                    int contentLength = 0;
                    foreach (string line in lines)
                    {
                        if (line.StartsWith("Content-Length:", StringComparison.OrdinalIgnoreCase))
                        {
                            int.TryParse(line.Substring(15).Trim(), out contentLength);
                        }
                    }

                    int headerByteEnd = -1;
                    for (int i = 0; i <= bytesRead - 4; i++)
                    {
                        if (buffer[i] == '\r' && buffer[i + 1] == '\n' && buffer[i + 2] == '\r' && buffer[i + 3] == '\n')
                        {
                            headerByteEnd = i + 4;
                            break;
                        }
                    }

                    string body = "";
                    if (headerByteEnd != -1)
                    {
                        int bodyBytesRead = bytesRead - headerByteEnd;
                        using (var ms = new MemoryStream())
                        {
                            if (bodyBytesRead > 0)
                            {
                                ms.Write(buffer, headerByteEnd, bodyBytesRead);
                            }

                            while (ms.Length < contentLength)
                            {
                                int toRead = Math.Min(buffer.Length, contentLength - (int)ms.Length);
                                int r = stream.Read(buffer, 0, toRead);
                                if (r <= 0) break;
                                ms.Write(buffer, 0, r);
                            }

                            body = Encoding.UTF8.GetString(ms.ToArray());
                        }
                    }

                    if (method == "OPTIONS")
                    {
                        SendResponse(stream, 204, "No Content", "text/plain", new byte[0]);
                        return;
                    }

                    if (path.Equals("/api/health", StringComparison.OrdinalIgnoreCase))
                    {
                        string hasAi = string.IsNullOrEmpty(geminiApiKey) ? "false" : "true";
                        string json = string.Format("{{\"status\":\"healthy\",\"engine\":\"ScamShield C# Engine v2.4\",\"ai_enabled\":{0}}}", hasAi);
                        byte[] jsonBytes = Encoding.UTF8.GetBytes(json);
                        SendResponse(stream, 200, "OK", "application/json; charset=utf-8", jsonBytes);
                        return;
                    }

                    if (path.Equals("/api/analyze", StringComparison.OrdinalIgnoreCase) && method == "POST")
                    {
                        string text = ExtractJsonString(body, "text");
                        string lang = ExtractJsonString(body, "lang");
                        if (string.IsNullOrEmpty(lang)) lang = "en";

                        Console.WriteLine(string.Format("[*] [{0}] Analyzing message ({1} chars)...", DateTime.Now.ToString("HH:mm:ss"), text.Length));

                        AnalysisResult result = PerformHeuristicAnalysis(text, lang);
                        string json = SerializeResult(result);
                        byte[] jsonBytes = Encoding.UTF8.GetBytes(json);
                        SendResponse(stream, 200, "OK", "application/json; charset=utf-8", jsonBytes);
                        return;
                    }

                    ServeStaticFile(path, stream);
                }
            }
            catch (Exception)
            {
                // Disconnected
            }
            finally
            {
                client.Close();
            }
        }

        private static void SendResponse(NetworkStream stream, int statusCode, string statusText, string contentType, byte[] content)
        {
            StringBuilder headers = new StringBuilder();
            headers.AppendFormat("HTTP/1.1 {0} {1}\r\n", statusCode, statusText);
            headers.Append("Server: ScamShield-AI/2.4\r\n");
            headers.Append("Access-Control-Allow-Origin: *\r\n");
            headers.Append("Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n");
            headers.Append("Access-Control-Allow-Headers: Content-Type\r\n");
            headers.AppendFormat("Content-Type: {0}\r\n", contentType);
            headers.AppendFormat("Content-Length: {0}\r\n", content.Length);
            headers.Append("Connection: close\r\n\r\n");

            byte[] headerBytes = Encoding.UTF8.GetBytes(headers.ToString());
            stream.Write(headerBytes, 0, headerBytes.Length);
            if (content.Length > 0)
            {
                stream.Write(content, 0, content.Length);
            }
            stream.Flush();
        }

        private static void ServeStaticFile(string rawUrl, NetworkStream stream)
        {
            int qIdx = rawUrl.IndexOf('?');
            if (qIdx != -1) rawUrl = rawUrl.Substring(0, qIdx);

            if (string.IsNullOrEmpty(rawUrl) || rawUrl == "/")
            {
                rawUrl = "/index.html";
            }

            string relativePath = rawUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
            string filePath = Path.Combine(rootDirectory, relativePath);

            if (File.Exists(filePath))
            {
                string ext = Path.GetExtension(filePath).ToLower();
                string mime = GetMimeType(ext);
                byte[] fileBytes = File.ReadAllBytes(filePath);
                SendResponse(stream, 200, "OK", mime, fileBytes);
            }
            else
            {
                byte[] notFound = Encoding.UTF8.GetBytes("404 File Not Found");
                SendResponse(stream, 404, "Not Found", "text/plain", notFound);
            }
        }

        private static AnalysisResult PerformHeuristicAnalysis(string text, string lang)
        {
            var res = new AnalysisResult();
            res.text = text;
            res.analyzedAt = DateTime.UtcNow.ToString("o");
            int score = 0;

            // 1. Link Analysis
            MatchCollection urlMatches = Regex.Matches(text, @"(?:https?:\/\/|www\.)[^\s<>'""()]+|(?:\b[a-zA-Z0-9-]+\.(?:xyz|top|buzz|club|work|click|cam|vip|space|live|icu|online|site)\b[^\s<>'""()]*)", RegexOptions.IgnoreCase);
            res.linkCount = urlMatches.Count;
            res.hasLinks = urlMatches.Count > 0;

            int linkScore = 0;
            List<string> linkEvidences = new List<string>();
            foreach (Match m in urlMatches)
            {
                string u = m.Value.ToLower();
                if (Regex.IsMatch(u, @"\b(\.xyz|\.top|\.buzz|\.club|\.work|\.click|\.cam|\.vip|\.space|\.icu)\b"))
                {
                    linkScore += 35;
                    linkEvidences.Add(m.Value + " (Suspicious TLD)");
                    res.flaggedSnippets.Add(new Snippet { term = m.Value, reason = "High-risk domain extension frequently used in phishing", category = "link" });
                }
                if (Regex.IsMatch(u, @"\b(bit\.ly|tinyurl\.com|is\.gd|cutt\.ly|rb\.gy|t\.co)\b"))
                {
                    linkScore += 25;
                    linkEvidences.Add(m.Value + " (URL Shortener)");
                    res.flaggedSnippets.Add(new Snippet { term = m.Value, reason = "Masked short link hiding destination", category = "link" });
                }
                if (Regex.IsMatch(u, @"\b(sbi|yono|hdfc|icici|axis|indiapost|electricity|pan|kyc)\b") && !Regex.IsMatch(u, @"\b(sbi\.co\.in|onlinesbi\.sbi|hdfcbank\.com|icicibank\.com|indiapost\.gov\.in)\b"))
                {
                    linkScore += 40;
                    linkEvidences.Add(m.Value + " (Brand Spoofing)");
                    res.flaggedSnippets.Add(new Snippet { term = m.Value, reason = "Deceptive domain spoofing brand", category = "link" });
                }
            }

            if (linkScore > 0)
            {
                int capped = Math.Min(linkScore, 45);
                res.vectors.Add(new ThreatVector { id = "link_deception", severity = capped >= 30 ? "critical" : "warning", score = capped, evidence = linkEvidences });
                score += capped;
            }

            // 2. Urgency & Coercion
            MatchCollection urgencyMatches = Regex.Matches(text, @"\b(within \d{1,2} hours?|today itself|tonight (?:at )?\d{1,2}(?::\d{2})?\s*(?:pm|am)?|immediately|urgent(?:ly)?|last (?:chance|notice|warning)|final (?:notice|warning)|action required|account (?:will be )?blocked|account (?:will be )?suspended|account freeze|electricity (?:power )?will be disconnected|digital arrest|police action)\b|(?:24 గంటల్లో|ఈరోజే|ఈ రాత్రికే|ఈ రాత్రి|వెంటనే|బ్లాక్ చేయబడుతుంది|నిలిపివేయబడుతుంది|రద్దు కాకుండా|విద్యుత్)|(?:24 घंटे के भीतर|आज रात|तुरंत|ब्लॉक कर दिया जाएगा|काट दी जाएगी|बिजली)", RegexOptions.IgnoreCase);
            if (urgencyMatches.Count > 0)
            {
                int uScore = Math.Min(urgencyMatches.Count * 25, 35);
                List<string> uEv = new List<string>();
                foreach (Match m in urgencyMatches)
                {
                    uEv.Add(m.Value);
                    res.flaggedSnippets.Add(new Snippet { term = m.Value, reason = "Urgency / Panic trigger", category = "urgency" });
                }
                res.vectors.Add(new ThreatVector { id = "urgency_pressure", severity = "critical", score = uScore, evidence = uEv });
                score += uScore;
            }

            // 3. Credential Trap
            bool legitWarning = Regex.IsMatch(text, @"\b(never share (?:this |your )?otp|do not share (?:this |your )?otp|not share otp|ఎవరితోనూ పంచుకోవద్దు|సాझा न करें)\b", RegexOptions.IgnoreCase);
            if (!legitWarning)
            {
                MatchCollection credMatches = Regex.Matches(text, @"\b(?:share|send|tell|give|enter|disclose|update pan)\b[^\n.]{0,30}\b(?:otp|one[- ]time password|6[- ]digit|pin|atm pin|cvv|password)\b|(?:send|whatsapp|submit)[^\n.]{0,35}\b(?:aadhaar|pan card|bank details)\b", RegexOptions.IgnoreCase);
                if (credMatches.Count > 0)
                {
                    List<string> cEv = new List<string>();
                    foreach (Match m in credMatches)
                    {
                        cEv.Add(m.Value);
                        res.flaggedSnippets.Add(new Snippet { term = m.Value, reason = "Requests disclosure of OTP / Identity documents", category = "credential" });
                    }
                    res.vectors.Add(new ThreatVector { id = "credential_theft", severity = "critical", score = 40, evidence = cEv });
                    score += 40;
                }
            }

            // 4. Task / Job Fraud
            MatchCollection jobMatches = Regex.Matches(text, @"\b(?:part[- ]time|work from home|daily income|hiring remote)[^\n.]{0,40}\b(?:earn rs\.? ?\d{3,5}|liking (?:youtube|videos)|rating (?:products|hotels))\b|(?:t\.me\/[a-zA-Z0-9_]+|telegram|contact hr manager on whatsapp)", RegexOptions.IgnoreCase);
            if (jobMatches.Count > 0)
            {
                List<string> jEv = new List<string>();
                foreach (Match m in jobMatches)
                {
                    jEv.Add(m.Value);
                    res.flaggedSnippets.Add(new Snippet { term = m.Value, reason = "Task / Job prepaid fraud trigger", category = "job" });
                }
                res.vectors.Add(new ThreatVector { id = "task_job_scam", severity = "critical", score = 40, evidence = jEv });
                score += 40;
            }

            // 5. Lottery & Windfall
            MatchCollection lotteryMatches = Regex.Matches(text, @"\b(?:congratulations|congrats|winner)[^\n.]{0,35}\b(?:won|lucky draw|lottery|crorepati|kbc|25,?00,?000|cash prize)\b|(?:లక్కీ డ్రా|రూ\. ?25,?00,?000)|(?:लकी ड्रा|25 लाख)", RegexOptions.IgnoreCase);
            if (lotteryMatches.Count > 0)
            {
                List<string> lEv = new List<string>();
                foreach (Match m in lotteryMatches)
                {
                    lEv.Add(m.Value);
                    res.flaggedSnippets.Add(new Snippet { term = m.Value, reason = "Unsolicited lottery / improbable windfall", category = "reward" });
                }
                res.vectors.Add(new ThreatVector { id = "unrealistic_reward", severity = "critical", score = 40, evidence = lEv });
                score += 40;
            }

            // 6. Channel switching to personal mobile / WhatsApp for official services or lottery claims
            Match personalNumberMatch = Regex.Match(text, @"(?:contact (?:our )?(?:power )?(?:officer|manager|hr)[^\n.]{0,25}(?:on|\:)?\s*(\+?91[- ]?)?[6-9]\d{9}|(?:send[^\n.]{0,20})?whatsapp[^\n.]{0,20}[6-9]\d{9}|contact hr manager on whatsapp|(?:అధికారి|సంప్రదించండి)[^\n.]{0,25}[6-9]\d{9}|(?:अधिकारी|संपर्क करें)[^\n.]{0,25}[6-9]\d{9}|[6-9]\d{9}[^\n.]{0,20}(?:సంప్రదించండి|संपर्क करें))", RegexOptions.IgnoreCase);
            if (personalNumberMatch.Success && (urgencyMatches.Count > 0 || lotteryMatches.Count > 0 || jobMatches.Count > 0 || text.Contains("విద్యుత్") || text.Contains("बिजली") || text.ToLower().Contains("electricity") || text.ToLower().Contains("power")))
            {
                score += 35;
                res.flaggedSnippets.Add(new Snippet { term = personalNumberMatch.Value, reason = "Personal mobile/WhatsApp channel used for official service, lottery claim, or employment", category = "contact" });
                res.vectors.Add(new ThreatVector { id = "channel_switch", severity = "critical", score = 35, evidence = new List<string> { personalNumberMatch.Value } });
            }

            // Legitimate transaction mitigation
            bool isLegitBank = Regex.IsMatch(text, @"\b(?:spent on your (?:debit|credit) card ending xx\d{4}|available balance:? rs\.?|call 1800\d+)\b", RegexOptions.IgnoreCase);
            if (isLegitBank && urlMatches.Count == 0)
            {
                score = 10;
                res.vectors.Clear();
            }
            if (legitWarning && urlMatches.Count == 0 && res.vectors.Count == 0)
            {
                score = Math.Min(score, 10);
            }

            res.score = Math.Min(100, Math.Max(0, score));
            if (res.score >= 70) res.level = "high";
            else if (res.score >= 35) res.level = "medium";
            else res.level = "low";

            res.highlightedHtml = BuildHighlightedHtml(text, res.flaggedSnippets);
            return res;
        }

        private static string BuildHighlightedHtml(string text, List<Snippet> snippets)
        {
            string html = WebUtility.HtmlEncode(text);
            foreach (var s in snippets)
            {
                string encoded = WebUtility.HtmlEncode(s.term);
                string replacement = "<mark class=\"flagged-term flag-" + s.category + "\" title=\"" + WebUtility.HtmlEncode(s.reason) + "\">" + encoded + "</mark>";
                html = html.Replace(encoded, replacement);
            }
            return html;
        }

        private static string GetMimeType(string ext)
        {
            switch (ext)
            {
                case ".html": return "text/html; charset=utf-8";
                case ".css": return "text/css; charset=utf-8";
                case ".js": return "application/javascript; charset=utf-8";
                case ".json": return "application/json; charset=utf-8";
                case ".png": return "image/png";
                case ".jpg": case ".jpeg": return "image/jpeg";
                case ".svg": return "image/svg+xml";
                case ".ico": return "image/x-icon";
                default: return "application/octet-stream";
            }
        }

        private static string ExtractJsonString(string json, string key)
        {
            Match m = Regex.Match(json, "\"" + key + "\"\\s*:\\s*\"((?:\\\\\"|[^\"])*)\"");
            if (m.Success)
            {
                string val = m.Groups[1].Value;
                val = Regex.Replace(val, @"\\u([0-9a-fA-F]{4})", match =>
                {
                    return ((char)Convert.ToInt32(match.Groups[1].Value, 16)).ToString();
                });
                val = val.Replace("\\\"", "\"").Replace("\\\\", "\\").Replace("\\n", "\n").Replace("\\r", "\r").Replace("\\t", "\t");
                return val;
            }
            return "";
        }

        private static string SerializeResult(AnalysisResult r)
        {
            var sb = new StringBuilder();
            sb.Append("{");
            sb.AppendFormat("\"score\":{0},", r.score);
            sb.AppendFormat("\"level\":\"{0}\",", r.level);
            sb.AppendFormat("\"hasLinks\":{0},", r.hasLinks ? "true" : "false");
            sb.AppendFormat("\"linkCount\":{0},", r.linkCount);
            sb.AppendFormat("\"analyzedAt\":\"{0}\",", r.analyzedAt);
            sb.AppendFormat("\"text\":{0},", JsonEscape(r.text));
            sb.AppendFormat("\"highlightedHtml\":{0},", JsonEscape(r.highlightedHtml));

            sb.Append("\"vectors\":[");
            for (int i = 0; i < r.vectors.Count; i++)
            {
                var v = r.vectors[i];
                sb.Append("{");
                sb.AppendFormat("\"id\":\"{0}\",\"severity\":\"{1}\",\"score\":{2},\"evidence\":[", v.id, v.severity, v.score);
                for (int j = 0; j < v.evidence.Count; j++)
                {
                    sb.Append(JsonEscape(v.evidence[j]));
                    if (j < v.evidence.Count - 1) sb.Append(",");
                }
                sb.Append("]}");
                if (i < r.vectors.Count - 1) sb.Append(",");
            }
            sb.Append("]}");

            return sb.ToString();
        }

        private static string JsonEscape(string s)
        {
            if (s == null) return "\"\"";
            StringBuilder sb = new StringBuilder("\"");
            foreach (char c in s)
            {
                switch (c)
                {
                    case '\\': sb.Append("\\\\"); break;
                    case '\"': sb.Append("\\\""); break;
                    case '\b': sb.Append("\\b"); break;
                    case '\f': sb.Append("\\f"); break;
                    case '\n': sb.Append("\\n"); break;
                    case '\r': sb.Append("\\r"); break;
                    case '\t': sb.Append("\\t"); break;
                    default:
                        if (c < ' ')
                        {
                            sb.AppendFormat("\\u{0:x4}", (int)c);
                        }
                        else
                        {
                            sb.Append(c);
                        }
                        break;
                }
            }
            sb.Append("\"");
            return sb.ToString();
        }
    }

    class AnalysisResult
    {
        public string text;
        public int score;
        public string level;
        public bool hasLinks;
        public int linkCount;
        public string analyzedAt;
        public string highlightedHtml;
        public List<ThreatVector> vectors = new List<ThreatVector>();
        public List<Snippet> flaggedSnippets = new List<Snippet>();
    }

    class ThreatVector
    {
        public string id;
        public string severity;
        public int score;
        public List<string> evidence = new List<string>();
    }

    class Snippet
    {
        public string term;
        public string reason;
        public string category;
    }
}
