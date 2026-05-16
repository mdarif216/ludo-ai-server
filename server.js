import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🔐 Secure key from Render
const GEMINI_KEY = process.env.GEMINI_API_KEY;

// ✅ AI route
app.post("/ai", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

// test route
app.get("/", (req, res) => {
  res.send("Gemini AI Server Running ✅");
});

app.listen(10000);
