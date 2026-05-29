```ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(message);

    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      reply: text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "Something went wrong.",
    });
  }
}
```
