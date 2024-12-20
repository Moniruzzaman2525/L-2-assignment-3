import { z } from "zod";

// create blog validation schema
const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    content: z
      .string({
        required_error: "Content is required",
      }),
    author: z.string().optional(),
    isPublished: z.string().optional(),
  })
});
 
// update blog validation schema
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z
      .string().optional(),
    author: z.string().optional(),
    isPublished: z.string().optional(),
  })
});
 
export const blogValidation = {
    createBlogValidationSchema,
    updateBlogValidationSchema
}