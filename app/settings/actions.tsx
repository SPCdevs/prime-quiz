"use server";
import { getUser, lucia } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const changeProfileSchema = z.object({
  displayName: z.string().min(1).max(40),
});

export const changeProfile = async (formData: FormData) => {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const formObject = Object.fromEntries(formData);

  const data = changeProfileSchema.parse(formObject);

  if (data.displayName) {
    await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        displayName: data.displayName,
      },
    });
  }

  revalidatePath("/");
  return { status: 200 };
};

export const logoutAccount = async () => {
  const user = getUser();
  if (!user) {
    redirect("/login");
  }
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId) {
    redirect("/login");
  }

  await lucia.invalidateSession(sessionId);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  revalidatePath("/");
  return redirect("/login");
};
