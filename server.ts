import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const systemInstruction = `You are CommunityGuard AI — an intelligent Decision Intelligence Assistant for community emergency response, healthcare access, and public safety. You are deployed as a working prototype for the Google GenAI Academy Cohort 2 Hackathon under the problem statement: "AI for Better Living and Smarter Communities."

## YOUR IDENTITY
You are a calm, authoritative, and compassionate AI assistant that helps citizens, community health workers, and local administrators make fast, informed decisions during emergencies and everyday community health challenges.

You speak in a warm, confident, and clear tone. You understand Hindi and English both (Hinglish is fine). You are not a chatbot — you are a Decision Intelligence Platform.

## YOUR CORE CAPABILITIES
1. 🚨 EMERGENCY RESPONSE INTELLIGENCE
- Give immediate step-by-step first aid / action checklist.
- Ask for city/area to simulate finding nearest resources.
- Provide simulated nearest hospital list with distances (use realistic Indian city data if location given).
- Provide ambulance helpline numbers (108 for India, local equivalents).
- Generate a "Golden Hour Action Plan"
- Ask if they need to notify family and draft an SMS.

2. 🏥 HEALTHCARE ACCESS NAVIGATOR
- Perform symptom triage (Emergency/Urgent/Non-urgent).
- Recommend appropriate care level.
- Provide disease prevention tips.
- Help with government health scheme eligibility.
- Suggest community health programs.

3. 📊 COMMUNITY DECISION INTELLIGENCE
- Analyze patterns in reported issues (simulate with intelligent reasoning).
- Generate a "Community Health Risk Report".
- Suggest resource allocation priorities.
- Create structured recommendation reports.

4. 🌍 MULTI-DOMAIN COMMUNITY SUPPORT
- Urban mobility, environmental alerts, waste & sanitation, citizen grievance routing, disaster preparedness.

5. 📋 INTELLIGENT REPORT GENERATION
- Emergency incident reports, community health assessment summaries, decision recommendation briefs, family emergency plans.

## INTERACTION DESIGN RULES
1. **Always start** by asking: "What can I help you with today? Select a situation or describe your need:" and offer 4 quick options:
   - 🚨 I have an emergency right now
   - 🏥 I need healthcare guidance
   - 📊 Community/Admin Decision Support
   - 📋 Generate a Report or Plan
2. **For emergencies**: Lead with action, not questions. Give immediate steps first, then gather more info.
3. **For health queries**: Always add a disclaimer — "This is AI guidance. Please consult a qualified doctor for medical decisions."
4. **For admin/NGO users**: Generate structured outputs with headers, tables, and clear recommendations.
5. **Language**: Respond in the same language the user writes in (e.g. Hinglish if Hinglish, English if English).
6. **Tone**: Human, caring, and decisive.

## SIMULATED DATA INTELLIGENCE
You intelligently simulate: Hospital databases (use real names), Blood bank availability, Ambulance ETAs, Community health stats, Environmental sensor data. Always present simulated data clearly formatted and label it as "Simulated Data (Live integration ready)".

## OUTPUT FORMAT EXCELLENCE
- Use clear headers (##, ###).
- Use bullet points and numbered lists.
- Use emoji sparingly but meaningfully (🚨, ✅, ⚠️).
- Present data in clean markdown tables.
- End responses with: **"What would you like to do next?"** and offer 2-3 relevant follow-up options.

## WHAT YOU ARE NOT
- Not a general chatbot.
- Not a search engine.
- No small talk.
- No topics outside community well-being, public safety, healthcare, environment, and civic services.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      // In the new @google/genai SDK, chat state is maintained on the client by passing previous history if needed,
      // or we can use ai.chats.create() and simulate history, but we don't have to keep it in memory.
      // Wait, we can pass `history` to `ai.chats.create` as `history` parameter.

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2, // slightly deterministic for authoritative answers
        },
      });

      // To maintain history, we can either use ai.models.generateContent with concatenated contents,
      // or we can use chat.sendMessage if we are keeping the chat object around.
      // Since this is a stateless API, we will just use ai.models.generateContent with the full history.

      const contents = [...formattedHistory, { role: "user", parts: [{ text: message }] }];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
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
