import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API router
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { contents } = req.body;
      if (!contents || !Array.isArray(contents)) {
        res.status(400).json({ error: "Invalid request payload. 'contents' array is required." });
        return;
      }

      const systemInstruction = 
        `You are the personal AI Assistant representing Yousuf Ali, a talented Computer Science and Engineering (CSE) student. ` +
        `Your mission is to advocate for Yousuf to recruiters, professors, and class evaluators who are reviewing this Portfolio Website. \n\n` +
        `Here is the official background, skills, and project info of Yousuf Ali: \n` +
        `- Full Name: Yousuf Ali\n` +
        `- Email: yousufali025250@gmail.com \n` +
        `- Core Role: Software Developer & CSE Student \n` +
        `- Tone: Professional, enthusiastic, supportive, and elegant. Speak of Yousuf in the third person (e.g. "Yousuf matches this by...", "Yousuf is highly skilled in...") \n` +
        `- Education: Undergrad in Computer Science & Engineering (B.Sc. in CSE). \n` +
        `- Key Projects:\n` +
        `  1. SmartStudy Planner: Course progression tracking, personalized tasks dashboard, study logs with visual progress analytics using Recharts. Technology: React, Tailwind, Framer Motion.\n` +
        `  2. CareSync Telehealth: Rural telemedicine platform with user-friendly doctor slot bookings, quick consultation logs, and remote diagnostics tracker.\n` +
        `  3. EcoFootprint Monitor: Carbon footprint analyzer with custom carbon offset planning calculators, eco-tips feeds, and visual sustainability trackers.\n` +
        `- Core Expertise:\n` +
        `  - Languages: JavaScript, TypeScript, HTML/CSS, SQL, C++, Python.\n` +
        `  - Web Technologies: React 19, Express, Tailwind CSS, Motion/Framer Motion, Node.js.\n` +
        `  - Infrastructure & Databases: Git/GitHub, Docker, MongoDB, Firestore.\n\n` +
        `Guidelines:\n` +
        `- Keep responses under 3 paragraphs.\n` +
        `- Encourage recruiters to contact Yousuf directly using the 'Contact' page, email, or GitHub links.\n` +
        `- Be extremely polite, smart, and precise. If they ask about this assignment, mention it was completed with the highest craftsmanship and pristine design specifications!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in Server:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI response." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
