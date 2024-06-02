"use server";
import { prisma } from "@/utils/database/prisma";
import { lucia } from "@/utils/database/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verify } from "@node-rs/argon2";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

export const login = async (_prevState: unknown, formData: FormData) => {
  const formObject = Object.fromEntries(formData);
  const data = signUpSchema.parse(formObject);

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return {
      message: "Incorrect email or password",
    };
  }

  const validPassword = await verify(user.password, data.password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) {
    return {
      message: "Incorrect username or password",
    };
  }

  if (!validPassword) {
    return {
      message: "Incorrect email or password",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  revalidatePath("/");
  redirect("/");
};
