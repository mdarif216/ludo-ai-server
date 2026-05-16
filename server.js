import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.post("/ai", async (req, res) => {
    const prompt = req.body.prompt;

    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-5.3",
            input: prompt
        })
    });

    const data = await response.json();
    res.json(data);
});

app.listen(10000);
