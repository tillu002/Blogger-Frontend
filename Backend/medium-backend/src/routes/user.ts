import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { SigninInput, SignupInput } from "@tillu002/medium-common";
import { use } from "hono/jsx";
import { PrismaClient } from "@prisma/client/edge";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    message: string;
    id: string;
  };
}>();

userRouter.get("/userDetails", async (c) => {
  const id = c.req.header("uid" || "");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findFirst({
    where: {
      id: String(id),
    },
    select: {
      username: true,
      name: true,
      bio: true,
    },
  });

  return c.json({
    name: user?.name,
    bio: user?.bio,
    username: user?.username,
    uid: id,
  });
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = SigninInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "Unauthorised" });
  }

  const jwt = await sign(
    { id: user.id, username: user.username },
    c.env.JWT_SECRET
  );
  return c.json({
    token: jwt,
    name: user.name,
    uid: user.id,
    bio: user.bio,
    msg: "Succesfully SignedIn",
  });
});

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = SignupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const prisma2 = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma2.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
        bio: body.bio,
      },
    });
    console.log(user);
    const token = await sign(
      { id: user.id, username: user.username },
      c.env.JWT_SECRET
    );

    return c.json({
      token: token,
      name: user.name,
      uid: user.id,
      bio: user.bio,
      msg: "Successfully Signed Up",
    });
  } catch (e) {
    return c.json({ message: "Failed signing up! Try again => " + e });
  }
});
