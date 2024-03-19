import z from "zod";

export const SignupInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  bio: z.string().min(10),
});

export const SigninInput = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const createBlogInput = z.object({
  title: z.string().min(3),
  content: z.string(),
});

export const updateBlogInput = z.object({
  title: z.string().min(3),
  content: z.string(),
  id: z.string(),
});

export type SignupInput = z.infer<typeof SignupInput>;
export type SigninInput = z.infer<typeof SigninInput>;
export type createBlogInput = z.infer<typeof createBlogInput>;
export type updateBlogInput = z.infer<typeof updateBlogInput>;
