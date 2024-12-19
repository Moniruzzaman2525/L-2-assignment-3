

import { z } from 'zod'

const usserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }).email("Invalid email format"),
        password: z.string({
            required_error: 'Password is required'
        }),
        role: z.enum(['admin', 'user']).default('user'),
        isBlocked: z.boolean().default(false)
    })
})


export const userValidation = {
    usserValidationSchema
}