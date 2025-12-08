"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export async function register(formData: FormData) {
  const rawData = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validatedData = registerSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: "Invalid data" };
  }

  const { fullName, email, password } = validatedData.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: fullName,
      email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}

export async function login(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedData = loginSchema.safeParse(rawData);

  if (!validatedData.success) {
    return { error: "Invalid data" };
  }

  const { email, password } = validatedData.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if ((error as Error).message.includes("NEXT_REDIRECT")) {
      throw error;
    }

    return { error: "Invalid email or password" };
  }
}
