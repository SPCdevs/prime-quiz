"use server";
import { prisma } from "@/utils/database/prisma";
import { cookies } from "next/headers";
import { lucia } from "@/utils/database/auth";
import { redirect } from "next/navigation";
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

  const password = await Bun.password.hash(data.password);

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
  return redirect("/");
};
