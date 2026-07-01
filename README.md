# 🍕 OrderBot — AI Restaurant Ordering Assistant

A conversational AI ordering assistant built as the capstone project for **"ChatGPT Prompt Engineering for Developers"** (DeepLearning.AI, via Coursera). The original course project was a Python/Jupyter notebook prototype — this version reimagines it as a full chat-style web app with a custom UI, powered by Groq's free LLM API (Llama 3.3 70B).

![status](https://img.shields.io/badge/status-active-brightgreen) ![stack](https://img.shields.io/badge/stack-Next.js%20%2B%20Groq-black)

## ✨ Features

- Natural, conversational ordering flow — handles ambiguity, asks clarifying questions (size, quantity, toppings) one at a time
- Menu-grounded responses — the bot only references real menu items and prices, no hallucinated items
- Live order summary card generated dynamically as the conversation progresses
- Clean, custom chat UI (Tailwind CSS) with typing indicators and smooth scroll
- System prompt engineered using techniques from the course: clear instructions, structured output formatting, and guardrails against hallucination

## 🧠 What this demonstrates (prompt engineering concepts)

- **Structured system prompts** — defining persona, scope, and output format for an LLM
- **Few-shot grounding** — feeding the menu directly into context so the model can't invent prices
- **Output parsing** — having the model emit a machine-readable `[ORDER_SUMMARY]` block parsed by the frontend
- **Conversation state management** — maintaining multi-turn context across a full ordering flow

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Groq API](https://console.groq.com/) (`llama-3.3-70b-versatile`) — free tier, OpenAI-compatible
- Tailwind CSS

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/orderbot.git
cd orderbot
npm install
cp .env.example .env.local   # add your Groq API key
npm run dev
```

Visit `http://localhost:3000`.

## 📦 Deploy

Deploys cleanly to [Vercel](https://vercel.com) — just set `GROQ_API_KEY` as an environment variable in your project settings.

