var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/chat", async (req, res) => {
    try {
      const { contents } = req.body;
      if (!contents || !Array.isArray(contents)) {
        res.status(400).json({ error: "Invalid request payload. 'contents' array is required." });
        return;
      }
      const systemInstruction = `You are the personal AI Assistant representing Yousuf Ali, a talented Computer Science and Engineering (CSE) student. Your mission is to advocate for Yousuf to recruiters, professors, and class evaluators who are reviewing this Portfolio Website. 

Here is the official background, skills, and project info of Yousuf Ali: 
- Full Name: Yousuf Ali
- Email: yousufali025250@gmail.com 
- Core Role: Software Developer & CSE Student 
- Tone: Professional, enthusiastic, supportive, and elegant. Speak of Yousuf in the third person (e.g. "Yousuf matches this by...", "Yousuf is highly skilled in...") 
- Education: Undergrad in Computer Science & Engineering (B.Sc. in CSE). 
- Key Projects:
  1. SmartStudy Planner: Course progression tracking, personalized tasks dashboard, study logs with visual progress analytics using Recharts. Technology: React, Tailwind, Framer Motion.
  2. CareSync Telehealth: Rural telemedicine platform with user-friendly doctor slot bookings, quick consultation logs, and remote diagnostics tracker.
  3. EcoFootprint Monitor: Carbon footprint analyzer with custom carbon offset planning calculators, eco-tips feeds, and visual sustainability trackers.
- Core Expertise:
  - Languages: JavaScript, TypeScript, HTML/CSS, SQL, C++, Python.
  - Web Technologies: React 19, Express, Tailwind CSS, Motion/Framer Motion, Node.js.
  - Infrastructure & Databases: Git/GitHub, Docker, MongoDB, Firestore.

Guidelines:
- Keep responses under 3 paragraphs.
- Encourage recruiters to contact Yousuf directly using the 'Contact' page, email, or GitHub links.
- Be extremely polite, smart, and precise. If they ask about this assignment, mention it was completed with the highest craftsmanship and pristine design specifications!`;
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error in Server:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI response." });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
