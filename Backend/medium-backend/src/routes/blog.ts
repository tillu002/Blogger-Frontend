import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@tillu002/medium-common";

export const blogrouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    uid: string;
  };
}>();

/*NOTE:  Middleware */

blogrouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader || "", c.env.JWT_SECRET);
  try {
    if (user) {
      c.set("userId", user.id);
      await next();
    }
  } catch (e) {
    c.status(403);
    return c.json({ message: "You are unauthorised" });
  }
});

/*NOTE: Getting all the blogs */

blogrouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const uid = c.get("userId");

  const blogs = await prisma.post.findMany({
    where: {
      author: {
        id: {
          not: uid,
        },
      },
    },
    select: {
      content: true,
      title: true,
      id: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

/*NOTE: Getting a single blog */

blogrouter.get("/:id", async (c, next) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: String(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
            bio: true,
          },
        },
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      message: "Failed to fetch the blog",
    });
  }
});

/*NOTE: Creating a new blog */

blogrouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }

  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-IN", options);
  const formattedDateWithSuffix = addSuffixToDay(formattedDate);

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
      published: body.published,
      createdAt: formattedDateWithSuffix,
    },
  });
  return c.json({
    id: blog.id,
    msg: "Succesfully published the blog",
    date: blog.createdAt,
  });
});

function addSuffixToDay(dateString: string) {
  const day = parseInt(dateString.split(" ")[0]);
  let suffix = "th";

  if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
  } else if (day === 2 || day === 22) {
    suffix = "nd";
  } else if (day === 3 || day === 23) {
    suffix = "rd";
  }

  return dateString.replace(/\d+/, day + suffix);
}

/*NOTE: Updating an Existing Blog */

blogrouter.put("/:bID", async (c) => {
  const id = c.req.param("bID");
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid inputs" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const updatedBlog = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: updatedBlog.id,
    msg: "Succesfully updated the blog",
  });
});

/*NOTE: Getting Users Blogs */

blogrouter.get("/myBlogs/:uid", async (c) => {
  const uid = c.req.param("uid");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const myBlogs = await prisma.post.findMany({
      where: {
        authorId: uid,
      },
      select: {
        content: true,
        title: true,
        createdAt: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      myBlogs,
    });
  } catch (e) {
    return c.json({
      msg: "Error Fetching your blocks",
    });
  }
});

/*NOTE: Deleting a blog endpoint */

blogrouter.delete("myBlogs/:bID", async (c, next) => {
  const bID = c.req.param("bID");
  // const uid = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.delete({
      where: {
        id: String(bID),
      },
      select: {
        authorId: true,
      },
    });
    c.json({ post });
  } catch (e) {
    return c.json({
      msg: "Could't delete your blog please try again after sometime" + e,
    });
  }
});
