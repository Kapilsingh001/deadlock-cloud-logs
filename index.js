import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Store logs per user
const userLogs = {};

/* ================= ADD LOG ================= */

app.post("/log", (req, res) => {

  const { userId, level = "INFO", message } = req.body;

  // validation
  if (!userId || !message) {
    return res.status(400).json({
      error: "userId and message are required"
    });
  }

  // IST time
  const time = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // create log array if user not exists
  if (!userLogs[userId]) {
    userLogs[userId] = [];
  }

  // push log
  userLogs[userId].push({
    time,
    level,
    message
  });

  res.json({
    status: "ok",
    user: userId
  });
});


/* ================= GET USER LOGS ================= */

app.get("/logs/:userId", (req, res) => {

  const { userId } = req.params;

  if (!userLogs[userId]) {
    return res.json([]);
  }

  res.json(userLogs[userId]);
});


/* ================= HEALTH CHECK ================= */

app.get("/health", (req, res) => {
  res.json({ status: "running" });
});


/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Cloud server running on port ${PORT}`);
});
