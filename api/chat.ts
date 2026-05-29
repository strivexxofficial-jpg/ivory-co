```ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export async function generateChatResponse(message: string) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are the AI concierge for Ivory & Co. Elite Dental Studio.

Rules:
- Only answer questions related to dental care, cosmetic dentistry, bookings, veneers, implants, whitening, Invisalign, pricing, consultations, and oral health.
- Keep responses concise and premium sounding.
- Always encourage booking a consultation.
- Never answer unrelated topics.
            `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood. I will act as Ivory & Co.'s AI concierge.",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
  });

  return response.text;
}
```
