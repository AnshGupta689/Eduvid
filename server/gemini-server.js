// server/gemini-server.js

// --- ES MODULE IMPORTS ---
import express from 'express';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' }); 
// -------------------------

const app = express();
const PORT = 4000;

// --- Key Check and Initialization ---
// Note: In a real app, you would handle this failure more robustly in production.
if (!process.env.GEMINI_API_KEY) {
    console.error("FATAL ERROR: GEMINI_API_KEY not set in .env file! Server cannot start.");
}

// Initialize AI client if key is available
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI(process.env.GEMINI_API_KEY) : null;
const model = 'gemini-2.5-flash';

// --- System Prompt Definition ---
// ... (previous imports and initializations)

const SYSTEM_INSTRUCTION = `
You are an expert educational content writer and animator. Your task is to generate a fully animated video script and a short quiz for a given topic.

The animation must use simple shapes, colors, and motion suitable for a 800x450 canvas.

The output must be a single JSON object that strictly follows this schema. DO NOT include any markdown, commentary, or text outside the required JSON object.

Total video duration must be between 10 and 15 seconds (3-4 scenes).

JSON SCHEMA:
{
  "title": string,
  "topic": string,
  "scenes": [
    {
      "duration": number,
      "commands": [
        {
          "type": "text" | "circle" | "arrow",
          "content": string, // Text for text commands, or description for shape commands
          "color": string, // Hex code or name (e.g., '#06b6d4' or 'red')
          "size": number, // Font size or radius
          "startX": number, // Normalized start X position (0-800)
          "endX": number, // Normalized end X position (0-800). Use for motion.
          "startY": number, // Normalized start Y position (0-450)
          "endY": number // Normalized end Y position (0-450). Use for motion.
        }
      ]
    }
  ],
  "quizQuestions": [ 
    // ... (quiz structure remains the same)
  ]
}
`;

// ... (rest of server/gemini-server.js remains the same)

// API Endpoint: /generate-script (proxied from /api/generate-script by Vite)
app.get('/generate-script', async (req, res) => {
    try {
        if (!ai) {
            return res.status(500).json({ 
                error: 'AI Client Not Initialized', 
                details: 'GEMINI_API_KEY is missing from the .env file. Check server logs.' 
            });
        }
        
        // Express uses req.query for GET parameters (e.g., ?prompt=...)
        const prompt = req.query.prompt; 
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        const response = await ai.models.generateContent({
            model: model,
            contents: [{ role: "user", parts: [{ text: `Generate the video script for the topic: ${prompt}` }] }],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json"
            }
        });

        // Safely extract and parse JSON, handling potential markdown wrappers
        const rawText = response.text;
        const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
        let jsonString = jsonMatch && jsonMatch[1] ? jsonMatch[1].trim() : rawText.trim();
        
        const result = JSON.parse(jsonString);

        res.json(result);
        
    } catch (error) {
        console.error('SERVER CRASH / Gemini Error:', error.message);
        // Return a clear JSON error response on failure (prevents the HTML error)
        res.status(500).json({ 
            error: 'AI generation failed due to server runtime error.',
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Express Server running on http://localhost:${PORT}`);
});
