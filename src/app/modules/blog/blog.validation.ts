import { z } from "zod";

const createBlogValidationSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  content: z
    .string({
      required_error: "Content is required",
    }),
  author: z.string(),
  isPublished: z.string().optional(),
});
 
export const blogValidation = {
    createBlogValidationSchema
}