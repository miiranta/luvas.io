const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();

const DATA_DIR = path.join(__dirname, "data", "sentences");
const PORT = process.env.PORT || 3000;

const MAX_PER_DAY = 10;

const RESULT_DIR = path.join(__dirname, "data", "result");
const RESULT_PATH = path.join(RESULT_DIR, "result.csv");

let sentencesIndex = [];

// ip -> { windowStart: timestampMs, count: number, assigned: { sentenceId: string, sentence: object, assignedAt: timestampMs } }
const ipStore = new Map();

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  const ip = xf ? String(xf).split(",")[0].trim() : req.ip || (req.connection && req.connection.remoteAddress) || "unknown";

  const ua = req.headers["user-agent"] || "";
  const chUa = req.headers["sec-ch-ua"] || "";
  const chPlatform = req.headers["sec-ch-ua-platform"] || "";
  const lang = req.headers["accept-language"] || "";
  const encoding = req.headers["accept-encoding"] || "";
  const dnt = req.headers["dnt"] || "";
  const proto = req.headers["x-forwarded-proto"] || req.protocol || "";
  const accept = req.headers["accept"] || "";
  const acceptCharset = req.headers["accept-charset"] || "";

  const raw = `${ip}|${ua}|${chUa}|${chPlatform}|${lang}|${encoding}|${dnt}|${proto}|${accept}|${acceptCharset}`;
  try {
    const hash = crypto.createHash("sha256").update(raw).digest("hex").slice(0, 32);
    return `${ip}::${hash}`;
  } catch (err) {
    return ip;
  }
}

function resetWindowIfExpired(state) {
  const now = Date.now();
  if (!state.windowStart || now - state.windowStart > 24 * 60 * 60 * 1000) {
    state.windowStart = now;
    state.count = 0;
  }
}

function loadSentences(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error(`Data directory not found: ${directory}`);
  }

  const files = fs
    .readdirSync(directory)
    .filter((f) => fs.statSync(path.join(directory, f)).isFile());
  if (files.length === 0) {
    throw new Error(`No files found in data directory: ${directory}`);
  }

  const all = [];
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const ext = path.extname(file);
    const dateName = path.basename(file, ext);
    const content = fs.readFileSync(fullPath, "utf8");
    const lines = content
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    lines.forEach((sent, idx) => {
      all.push({ sentence: sent, date: dateName, index: idx });
    });
  }

  if (all.length === 0) {
    throw new Error(`No sentences found in files under: ${directory}`);
  }

  return all;
}

function prepareResultStorage(resultDir, resultPath) {
  try {
    if (!fs.existsSync(resultDir)) {
      fs.mkdirSync(resultDir, { recursive: true });
      console.log(`Created result directory at ${resultDir}`);
    }

    if (!fs.existsSync(resultPath)) {
      fs.writeFileSync(resultPath, "", "utf8");
      console.log(`Created result file at ${resultPath}`);

      const header = "Date|Model|Grade|Sentence|Index\n";
      fs.appendFileSync(resultPath, header, "utf8");
    }
  } catch (err) {
    console.error("Failed to prepare result storage:", err.message);
    process.exit(1);
  }
}

try {
  prepareResultStorage(RESULT_DIR, RESULT_PATH);

  sentencesIndex = loadSentences(DATA_DIR);
  console.log(`Loaded ${sentencesIndex.length} sentences`);
} catch (err) {
  console.error("Startup error:", err.message);
  process.exit(1);
}

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Get a random sentence
app.get("/sentence", (req, res) => {
  if (!sentencesIndex || sentencesIndex.length === 0) {
    return res.status(500).json({ error: "No sentences available" });
  }
  const ip = getClientIp(req);
  let state = ipStore.get(ip);
  if (!state) {
    state = { windowStart: Date.now(), count: 0, assigned: null };
    ipStore.set(ip, state);
  }

  resetWindowIfExpired(state);

  if (state.count >= MAX_PER_DAY) {
    return res.status(429).json({
      error: "LIMIT_EXCEEDED",
      message: "Obrigado por contribuir! Sua participação é muito importante.",
      quota: { max: MAX_PER_DAY, used: state.count },
    });
  }

  if (state.assigned && state.assigned.sentence) {
    return res.json({
      ...state.assigned.sentence,
      quota: { max: MAX_PER_DAY, used: state.count },
    });
  }

  const pick =
    sentencesIndex[Math.floor(Math.random() * sentencesIndex.length)];
  state.assigned = {
    sentenceId: `${pick.date}_${pick.index}`,
    sentence: pick,
    assignedAt: Date.now(),
  };
  ipStore.set(ip, state);
  return res.json({ ...pick, quota: { max: MAX_PER_DAY, used: state.count } });
});

// Record a sentence score
app.post("/sentence/:sentence_id/:score", (req, res) => {
  const { sentence_id, score } = req.params;

  if (!sentence_id || !score) {
    return res.status(400).json({ error: "Missing sentence_id or score" });
  }

  if (!["-1", "0", "1"].includes(score)) {
    return res.status(400).json({ error: "Score must be one of -1, 0, 1" });
  }

  const parts = sentence_id.split("_");
  if (parts.length < 2) {
    return res
      .status(400)
      .json({ error: "sentence_id must be in format <date>_<index>" });
  }

  const indexStr = parts.pop();
  const dateName = parts.join("_");
  const idx = Number(indexStr);
  if (Number.isNaN(idx)) {
    return res
      .status(400)
      .json({ error: "Index part of sentence_id must be a number" });
  }

  const found = sentencesIndex.find(
    (s) => s.date === dateName && s.index === idx
  );
  if (!found) {
    return res.status(404).json({ error: "Sentence not found" });
  }

  //01022023 > 01/02/2023
  let date_formatted = found.date.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

  // append new record
  const line = `${found.date}|human|${score}|${found.sentence}|${found.index}\n`;
  try {
    fs.appendFileSync(RESULT_PATH, line, "utf8");
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to write result file", details: err.message });
  }

  try {
    const ip = getClientIp(req);
    let state = ipStore.get(ip);
    if (!state) {
      state = { windowStart: Date.now(), count: 0, assigned: null };
    }
    resetWindowIfExpired(state);

    state.count = (state.count || 0) + 1;

    if (state.assigned && state.assigned.sentenceId === sentence_id) {
      state.assigned = null;
    }

    ipStore.set(ip, state);
  } catch (err) {
    console.error("Failed to update IP state:", err && err.message);
  }

  return res.status(200).json({ added: true });
});

// 404
app.use((req, res) => {
  res.status(404).send("Not Found.");
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}/`);
});
