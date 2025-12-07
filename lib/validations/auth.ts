import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please, enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(32),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters").max(32),
    email: z.email("Please, enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters").max(32),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters").max(32),
  })
  .check(
    z.refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
