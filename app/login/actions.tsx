"use server";
import { prisma } from "@/utils/database/prisma";
import { cookies } from "next/headers";
import { lucia } from "@/utils/database/auth";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  const validPassword = Bun.password.verifySync(data.password, user.password);

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
