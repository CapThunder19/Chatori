import { z } from 'zod';


export const signupSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name cannot exceed 50 characters")
        .trim(),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name cannot exceed 50 characters")
        .trim(),
    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z
        .string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const loginSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address")
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(1, "Password is required"),
});


export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;