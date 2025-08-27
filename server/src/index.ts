import { Elysia, t } from "elysia";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/alive", () => ({
    data: {
      status: "Up"
    }
  }))
  .get("/health", () => ({
    data: {
      status: "OK"
    }
  }))
  .listen(3000);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);