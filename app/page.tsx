"use client";
import { useState } from "react";

type Msg = { role: "user" | "ai"; text: string };

export default function Home() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", text: input };
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
      setMessages([...newMessages, { role: "ai", text: data.reply || "No reply" }]);
    } catch (e) {
      setMessages([...newMessages, { role: "ai", text: "Error: Could not get reply." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>El-saad</h1>
      <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 15, minHeight: 300, marginBottom: 15 }}>
        {messages.length === 0 && <p>Ask me anything...</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === "user" ? "right" : "left", margin: "8px 0" }}>
            <span style={{ background: m.role === "user" ? "#000" : "#eee", color: m.role === "user" ? "#fff" : "#000", padding: "8px 12px", borderRadius: 15, display: "inline-block" }}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
        />
        <button onClick={send} style={{ padding: "12px 20px", borderRadius: 10, background: "#000", color: "#fff", border: "none" }}>
          Send
        </button>
      </div>
    </main>
  );
}