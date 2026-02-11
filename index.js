import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// logs separated by user
let userLogs = {};

app.post("/log", (req, res) => {

  const { userId, level, message } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }

  const time = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // create array if user doesn't exist
  if (!userLogs[userId]) {
    userLogs[userId] = [];
  }

  userLogs[userId].push({
    time,
    level: level || "INFO",
    message
  });

  res.json({ status: "ok" });
});


// get logs for specific user
app.get("/logs/:userId", (req, res) => {

  const userId = req.params.userId;

  res.json(userLogs[userId] || []);
});

app.get("/health", (req, res) => {
  res.json({ status: "running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Cloud server running on port " + PORT);
});
