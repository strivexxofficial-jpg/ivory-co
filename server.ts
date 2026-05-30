
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();

  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: "50mb" }));

  app.post("/api/chat", async (req, res) => {
    try {
      const { generateChatResponse } = await import("./api/chat");

      const body =
        typeof req.body === "string"
          ? JSON.parse(req.body)
          : req.body;

      const { message } = body;

      const reply = await generateChatResponse(message);

      res.status(200).json({
        reply,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        reply: "Something went wrong.",
      });
    }
  });

  app.post("/api/smile-sim-process", async (req, res) => {
    try {
      res.json({
        message: "Pipeline initiated",
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

  async function uploadToImgBB(
    base64Data: string
  ): Promise<string> {
    const base64Clean = base64Data.includes(",")
      ? base64Data.split(",")[1]
      : base64Data;

    const formData = new URLSearchParams();

    formData.append(
      "key",
      process.env.IMGBB_KEY || ""
    );

    formData.append("image", base64Clean);

    formData.append("expiration", "600");

    const res = await fetch(
      "https://api.imgbb.com/1/upload",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(
        "ImgBB upload failed: " +
          JSON.stringify(data)
      );
    }

    return data.data.url;
  }

  app.post("/api/pixazo", async (req, res) => {
    try {
      const { imageUrl } = req.body;

      const hostedImageUrl =
        await uploadToImgBB(imageUrl);

      console.log(
        "IMGBB IMAGE URL:",
        hostedImageUrl
      );

      const response = await fetch(
        "https://gateway.pixazo.ai/inpainting/v1/getImage",
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key":
              process.env.PIXAZO_KEY || "",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            prompt:
              "Bright white clean teeth. Professional teeth whitening. Remove all yellow stains and discoloration. Make teeth visibly white and clean.",
            negativePrompt:
              "yellow teeth, stained teeth, discolored enamel, dark spots, plaque",
            imageUrl: hostedImageUrl,
            width: 1024,
            height: 1024,
            num_steps: 30,
            guidance: 9,
            strength: 0.75,
          }),
        }
      );

      const text = await response.text();

      console.log(
        "PIXAZO RAW RESPONSE:",
        text
      );

      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        return res
          .status(response.status)
          .send(text);
      }

      if (!response.ok) {
        return res
          .status(response.status)
          .json(data);
      }

      res.json(data);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

  app.post("/api/pixazo/poll", async (req, res) => {
    try {
      const response = await fetch(
        "https://gateway.pixazo.ai/ai-model-api-polling/getGenerationResults",
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key":
              process.env.PIXAZO_KEY || "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        return res
          .status(response.status)
          .send(text);
      }

      res
        .status(response.status)
        .json(data);
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(
      process.cwd(),
      "dist"
    );

    app.use(express.static(distPath));

    app.get("*", (req: any, res: any) => {
      res.sendFile(
        path.join(distPath, "index.html")
      );
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
}

startServer();

