import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { blogrouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    message: string;
  };
}>();

app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogrouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get();

export default app;
