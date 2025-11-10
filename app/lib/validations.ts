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


export const storeSchema = z.object({
    name: z.string().min(1, 'Store name is required').max(200),
    phone: z.string().min(7, 'Phone number is required').max(20),
    openingTime: z.string().min(1, 'Opening time is required'),
    closingTime: z.string().min(1, 'Closing time is required'),
    imageBase64: z.string().optional(),
    location: z.object({
        lat: z.number(),
        lng: z.number(),
    }),
    foods: z.array(z.object({
        name: z.string().min(1, 'Food name is required').max(200),
        description: z.string().max(500).optional(),
        price: z.string().max(50).optional(),
    })).optional(),
});

export type StoreInput = z.infer<typeof storeSchema>;

export const reviewSchema = z.object({
    // allow anonymous (undefined) or a non-empty name up to 100 chars
    name: z.string().max(100).optional(),
    rating: z.number().min(1).max(5),
    comment: z.string().max(1000).optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;