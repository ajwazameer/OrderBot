"use client";

import { useState, useRef, useEffect } from "react";

function parseOrderSummary(text) {
  const match = text.match(/\[ORDER_SUMMARY\]([\s\S]*?)\[\/ORDER_SUMMARY\]/);
  if (!match) return { clean: text, summary: null };
  const clean = text.replace(match[0], "").trim();
  try {
    const summary = JSON.parse(match[1]);
    return { clean, summary };
  } catch {
    return { clean, summary: null };
  }
}

function OrderSummaryCard({ summary }) {
  return (
    <div className="mt-3 rounded-2xl border border-ember/30 bg-white shadow-sm p-4 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🧾</span>
        <h4 className="font-semibold text-char">Order Summary</h4>
      </div>
      <ul className="space-y-1 text-sm">
        {summary.items.map((item, i) => (
          <li key={i} className="flex justify-between text-char/80">
            <span>
              {item.qty > 1 ? `${item.qty}× ` : ""}
              {item.name}
              {item.size ? ` (${item.size})` : ""}
            </span>
            <span>${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-char/10 mt-2 pt-2 flex justify-between font-semibold text-ember">
        <span>Total</span>
        <span>${summary.total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey there! 👋 Welcome! I'm OrderBot — what can I get started for you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hmm, the kitchen line dropped. Try again?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-crust to-[#ecdfce] px-4 py-8">
      <div className="w-full max-w-2xl flex flex-col h-[85vh] bg-white/70 backdrop-blur rounded-3xl shadow-xl border border-char/5 overflow-hidden">
        {/* Header */}
        <div className="bg-char text-crust px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ember flex items-center justify-center text-lg">
            🍕
          </div>
          <div>
            <h1 className="font-display font-semibold text-lg leading-tight">OrderBot</h1>
            <p className="text-xs text-crust/60">AI-powered Pizza Ordering Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-6 space-y-4">
          {messages.map((m, i) => {
            const { clean, summary } = m.role === "assistant" ? parseOrderSummary(m.content) : { clean: m.content, summary: null };
            const isUser = m.role === "user";
            return (
              <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div className="flex flex-col max-w-[85%]">
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? "bg-ember text-white rounded-br-sm"
                        : "bg-white text-char border border-char/10 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {clean}
                  </div>
                  {summary && <OrderSummaryCard summary={summary} />}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-char/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm">
                <span className="w-2 h-2 bg-ember/60 rounded-full typing-dot" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 bg-ember/60 rounded-full typing-dot" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 bg-ember/60 rounded-full typing-dot" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-char/10 p-4 bg-white/80 flex gap-2">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your order… (e.g., 'Medium Pepperoni Pizza')"
            className="flex-1 resize-none rounded-xl border border-char/15 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ember/40"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-ember text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-ember/90 disabled:opacity-50 transition"
          >
            Send
          </button>
        </div>
      </div>

      <p className="text-xs text-char/40 mt-4">
        Designed and developed using Next.js, OpenAI API, and modern prompt engineering
      </p>
    </main>
  );
}
