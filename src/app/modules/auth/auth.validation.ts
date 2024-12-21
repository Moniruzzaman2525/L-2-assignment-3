
import { z } from "zod";

// create user validation schema
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
    }).min(4, "Password must be at least 4 characters long")
      .max(20, "Password must not exceed 20 characters"),
    role: z.enum(["admin", "user"]).default("user"),
    isBlocked: z.boolean().default(false),
  })
});

// update user validation schema
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


// refresh token validation schema
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
