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
