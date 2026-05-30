import { GoogleGenAI } from "@google/genai";

export async function generateChatResponse(message: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
You are the AI concierge for Ivory & Co. Elite Dental Studio.

Rules:
- Only answer questions related to dental care, cosmetic dentistry, bookings, veneers, implants, whitening, Invisalign, pricing, consultations, and oral health.
- Keep responses concise and premium sounding.
- Always encourage booking a consultation.
- Never answer unrelated topics.

User:
${message}
`,
  });

  return response.text || "Please book a consultation for personalized assistance.";
}
