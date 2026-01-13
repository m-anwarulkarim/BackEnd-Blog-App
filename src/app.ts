import express, { Application, Request, Response } from "express";
import { postRouter } from "./module/post/post.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { configs } from "./config";
import redisClient from "./lib/redis";
import { notFound } from "./middleware/notFound";
import { commentRouter } from "./module/comment/comment.route";
import { authRouter } from "./module/auth/auth.route";

const app: Application = express();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(
  cors({
    origin: configs.APP_URL,
    methods: ["GET", "DELETE", "POST", "PUT"],
    credentials: true,
  })
);

app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/users", authRouter);

app.get("/test-redis", async (req: Request, res: Response) => {
  try {
    // ১. Redis-এ ডাটা রাখা
    await redisClient.set("test_key", "Redis is working perfectly!");

    // ২. Redis থেকে ডাটা আনা
    const data = await redisClient.get("test_key");

    res.json({
      success: true,
      message: data,
    });
  } catch (error) {
    console.error("Redis Test Route Error:", error);
    res.status(500).json({
      success: false,
      message: "Redis operation failed",
    });
  }
});
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Blog API",
    version: "1.0.0",
    status: "Server is up and running",
    links: {
      auth: "/api/auth/login/social/google",
      posts: "/post",
    },
  });
});
app.use(notFound);
export default app;
