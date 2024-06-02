import { getUser } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async () => {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      answers: true,
      user: {
        select: {
          username: true,
          displayName: true,
        },
      },
      createdAt: true,
      history: {
        where: {
          userId: user.id,
        },
        select: {
          answer: true,
          correct: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return NextResponse.json(posts, {
    status: 200,
  });
};
