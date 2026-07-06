<div align="center">

# 🛡️ CommunityGuard AI

### An Intelligent Decision Intelligence Assistant for Community Emergency Response, Healthcare Access & Public Safety

Built for the **Google GenAI Academy Cohort 2 Hackathon**
Problem Statement: *"AI for Better Living and Smarter Communities"*

</div>

---

## 📖 About

**CommunityGuard AI** is a Gemini-powered decision intelligence platform that helps citizens, community health workers, and local administrators make fast, informed decisions during emergencies and everyday community health challenges.

It's not just a chatbot — it acts as a real-time assistant that gives immediate first-aid steps, triages symptoms, surfaces simulated nearby emergency resources, and generates structured reports for admins/NGOs, all in a warm, calm, authoritative tone that understands both Hindi and English (Hinglish included).

---

## ✨ Features

- 🚨 **Emergency Response Intelligence** — instant step-by-step action checklists, Golden Hour action plans, nearest hospital/ambulance simulation, and one-tap SMS alerts to an emergency contact
- 🏥 **Healthcare Access Navigator** — symptom triage (Emergency / Urgent / Non-urgent), care-level recommendations, and government health scheme guidance
- 📊 **Community Decision Intelligence** — structured recommendation reports and resource allocation insights for admins and NGOs
- 📍 **Live Location Awareness** — auto-detect current location via geolocation + reverse geocoding, or set it manually
- 📋 **Live Situation Hub** — a real-time sidebar with nearby hospitals, air quality, heat alerts, and filterable community alerts
- 🌐 **Bilingual by Design** — responds in the same language the user types in (English or Hinglish)
- 📱 **Mobile-Friendly** — haptic feedback, responsive layout, and native share/SMS integration

---

🚀 Live Demo

👉 communityguard-ai-production.up.railway.app

----

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Express.js (Node.js) |
| AI | Google Gemini API (`@google/genai`) |
| Markdown Rendering | react-markdown + remark-gfm |
| Icons | lucide-react |

---

## 🚀 Getting Started

**Prerequisites:** Node.js

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/pradeep1330/communityguard-ai.git
   cd communityguard-ai
   npm install
   ```

2. Create a `.env.local` file and add your Gemini API key:
   ```bash
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

3. Run the app locally:
   ```bash
   npm run dev
   ```

4. Open (http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
communityguard-ai/
├── server.ts                  # Express server + Gemini API integration
├── src/
│   ├── App.tsx                 # Core app state & logic
│   ├── components/
│   │   ├── Header.tsx          # Top bar: location, emergency contact, share
│   │   ├── ChatArea.tsx        # Chat interface & quick-action cards
│   │   ├── Sidebar.tsx         # Live Situation Hub (simulated data)
│   │   └── EmergencyContactModal.tsx
│   ├── data/constants.ts       # Quick options & mock alert data
│   ├── types/index.ts          # Shared TypeScript types
│   └── utils/index.ts          # Helper functions
└── index.html
```

---

## ⚠️ Disclaimer

CommunityGuard AI provides AI-generated guidance only. It is **not a substitute for professional medical advice** — always consult a qualified doctor or call your local emergency number (**108** in India) for real emergencies. All hospital, ambulance, and environmental data shown in this prototype is **simulated** for demonstration purposes.

---

## 📄 License

This project was built for hackathon purposes as part of the Google GenAI Academy Cohort 2.

---

<div align="center">

Made with ⚡ by [Pradeep](https://github.com/pradeep1330)

</div>
