"use server";
import { prisma } from "@/utils/database/prisma";
import { lucia } from "@/utils/database/auth";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3).max(16).toLowerCase(),
  displayName: z.string().min(1).max(40),
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

export const signUp = async (_prevState: unknown, formData: FormData) => {
  const formObject = Object.fromEntries(formData);
  const data = signUpSchema.parse(formObject);

  const existingUsers = await prisma.user.findMany({
    where: {
      OR: [{ username: data.username }, { email: data.email }],
    },
  });

  if (existingUsers.length > 0) {
    return {
      message: "A user with the same username or email already exists.",
    };
  }

  const password = await hash(data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const user = await prisma.user.create({
    data: {
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      password,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return {
    message: "success",
  };
};
