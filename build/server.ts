// import { serveStatic } from "hono/bun";
import { serveStatic } from "npm:hono/deno";
import { Hono } from "npm:hono";
import { secureHeaders } from "npm:hono/secure-headers";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const app = new Hono();
console.log("ok...");
app.use(
  "*",
  secureHeaders({
    crossOriginEmbedderPolicy: true,
  })
);
app.use("/*", serveStatic({ root: "./dist" }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/*", serveStatic({ root: join(__dirname, "dist") }));

export default app;
