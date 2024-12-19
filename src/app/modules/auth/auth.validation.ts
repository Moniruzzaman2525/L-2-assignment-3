
import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    password: z.string({
      required_error: "Password is required",
    }),
    role: z.enum(["admin", "user"]).default("user"),
    isBlocked: z.boolean().default(false),
  })
});


const userValidationLoginSchema = z.object({
 body: z.object({
  email: z.string({
    required_error: 'Email is required'
  }),
  password: z.string({
    required_error: 'Password is required'
  })
 })
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});


export const userValidation = {
  userValidationSchema,
  userValidationLoginSchema,
  refreshTokenValidationSchema
};
