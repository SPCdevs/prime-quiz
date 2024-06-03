import { prisma } from "@/utils/database/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (
  _request: NextRequest,
  { params }: { params: { username: string } },
) => {
  const user = await prisma.user.findUnique({
    where: {
      username: params.username,
    },
    select: {
      username: true,
      displayName: true,
      bio: true,
      points: true,
      posts: {
        select: {
          title: true,
          answers: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      {},
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(user, {
    status: 200,
  });
};
