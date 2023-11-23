import { z } from "zod"

export const AuthValidator = z.object({
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
})

export type TypeAuthValidator = z.infer<typeof AuthValidator>