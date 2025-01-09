// import { serveStatic } from "hono/bun";
import { serveStatic } from "hono/deno";
import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
const app = new Hono();
console.log("ok...");
app.use(
  "*",
  secureHeaders({
    crossOriginEmbedderPolicy: true,
  })
);
app.use("/*", serveStatic({ root: "./dist/" }));

export default app;
