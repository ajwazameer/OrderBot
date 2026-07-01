import OpenAI from "openai";
import { SYSTEM_PROMPT } from "../../menu";

// Groq offers a free, fast, OpenAI-API-compatible endpoint — no billing required.
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    const reply = completion.choices[0].message.content;
    return Response.json({ reply });
  } catch (err) {
    console.error(err);
    return Response.json(
      { reply: "Sorry, something went wrong reaching the kitchen 🍕. Please try again." },
      { status: 500 }
    );
  }
}
