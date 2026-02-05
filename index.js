import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let logs = [];

// receive log
app.post("/log", (req, res) => {
  const time = new Date().toLocaleTimeString();
  logs.push(`[${time}] ${req.body.message}`);
  res.json({ status: "ok" });
});

// send logs
app.get("/logs", (req, res) => {
  res.json(logs);
});

// health check
app.get("/health", (req, res) => {
  res.json({ status: "running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Cloud server running on port " + PORT);
});

