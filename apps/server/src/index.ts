import "dotenv/config";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

new Elysia()
  .use(
    cors({
      origin: process.env.CORS_ORIGIN || "",
      methods: ["GET", "POST", "OPTIONS"],
    }),
  )
  .get("/", () => "OK")
  .listen(4400, () => {
    console.log("Server is running on http://localhost:4400");
  });
