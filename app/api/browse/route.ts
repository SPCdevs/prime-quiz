import { prisma } from "@/utils/database/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic'
export const GET = async () => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      answers: true,
      user: {
        select: {
          username: true,
          displayName: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 10,
  });

  return NextResponse.json(posts, {
    status: 200,
  });
};
