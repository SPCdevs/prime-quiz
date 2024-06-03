import { getUser } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(posts, {
    status: 200,
  });
};
