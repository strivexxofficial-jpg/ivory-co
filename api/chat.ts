export async function generateChatResponse(message: string): Promise<string> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are the AI concierge for Ivory & Co. Elite Dental Studio. Only answer questions about dental care, cosmetic dentistry, veneers, implants, whitening, Invisalign, pricing, and bookings. Be concise, warm, and premium-sounding. Always encourage booking a consultation.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 300,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Please book a consultation for personalized assistance.";
}
