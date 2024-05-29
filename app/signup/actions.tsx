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

export const signUp = async (formData: FormData) => {
  formData.forEach((value, key) =>
    console.log(`key is : ${key} and value is `, value),
  );
  const data = signUpSchema.parse(formData);

  const password = await Bun.password.hash(data.password);

  const user = await prisma.user.upsert({
    where: {
      username: data.username,
      OR: [{ username: data.username }, { email: data.email }],
    },
    create: {
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      password,
    },
    update: {},
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
