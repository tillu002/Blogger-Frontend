import z from "zod";
export declare const SignupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    bio: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name: string;
    bio: string;
}, {
    username: string;
    password: string;
    name: string;
    bio: string;
}>;
export declare const SigninInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type SignupInput = z.infer<typeof SignupInput>;
export type SigninInput = z.infer<typeof SigninInput>;
export type createBlogInput = z.infer<typeof createBlogInput>;
export type updateBlogInput = z.infer<typeof updateBlogInput>;
