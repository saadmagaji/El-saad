export async function POST(req: Request) {
  const { message } = await req.json();

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are El-saad, a helpful AI assistant created by Sa'adu. Answer simply and friendly." },
        { role: "user", content: message }
      ],
    }),
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't get that.";
  return Response.json({ reply });
}