import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let logs = [];

app.post("/log", (req, res) => {

  const time = new Date().toLocaleTimeString();

  logs.push({
    time,
    level: req.body.level || "INFO",
    message: req.body.message
  });

  res.json({ status: "ok" });
});

app.get("/logs", (req, res) => {
  res.json(logs);
});

app.get("/health", (req, res) => {
  res.json({ status: "running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Cloud server running on port " + PORT);
});
