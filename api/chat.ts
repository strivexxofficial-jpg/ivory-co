import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
    });

    const { message } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
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

    res.status(200).json({
      reply:
        response.text ||
        "Please book a consultation for personalized assistance.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
}
