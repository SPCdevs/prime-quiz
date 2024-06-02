"use server";
import { getUser, lucia, validateRequest } from "@/utils/database/auth";
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
  const { session } = await validateRequest();
  if (!session) {
    redirect("/login");
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  revalidatePath("/");
  redirect("/login");
};

export const deleteAccount = async () => {
  const { session, user } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateUserSessions(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  revalidatePath("/");
  return redirect("/");
};
