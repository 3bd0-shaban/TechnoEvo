import { z } from "zod";

export const NewBlogSchema = z.object({
    title: z.string().nonempty('Title is Required'),
    // content: z.string().nonempty('Content is Reqired')
})