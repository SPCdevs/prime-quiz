import { getUser } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const data = await request.json();

  await prisma.post.deleteMany({
    where: {
      userId: user.id,
      id: data.id,
    },
  });

  revalidatePath("/manage");
  return NextResponse.json({ message: "success" }, { status: 200 });
};
