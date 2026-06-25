import express from "express";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname  = dirname(fileURLToPath(import.meta.url));
const LOG_DIR    = join(__dirname, "logs");
const LOG_FILE   = join(LOG_DIR, "visitor-logs.json");
const PORT       = process.env.LOG_PORT || 3000;

if (!existsSync(LOG_DIR)) mkdirSync(LOG_DIR);
if (!existsSync(LOG_FILE)) writeFileSync(LOG_FILE, "[]");

const app = express();
app.use(express.json());

// Allow requests from Vite dev server
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post("/api/log-visit", (req, res) => {
  try {
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket.remoteAddress ||
      "unknown";

    const now = new Date();
    const entry = {
      timestamp: now.toLocaleString("en-PK", {
        timeZone:   "Asia/Karachi",
        year:       "numeric",
        month:      "long",
        day:        "numeric",
        hour:       "2-digit",
        minute:     "2-digit",
        second:     "2-digit",
        hour12:     true,
      }) + " (PKT)",
      ip,
      ...req.body,
    };

    const logs = JSON.parse(readFileSync(LOG_FILE, "utf8"));
    logs.unshift(entry);
    writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));

    res.json({ ok: true });
  } catch (err) {
    console.error("Log error:", err.message);
    res.status(500).json({ ok: false });
  }
});

app.listen(PORT, () =>
  console.log(`Visitor log API running on http://localhost:${PORT}`)
);
