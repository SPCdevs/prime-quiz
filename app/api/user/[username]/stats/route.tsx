import { prisma } from "@/utils/database/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (
  _request: NextRequest,
  { params }: { params: { username: string } },
) => {
  const stats = await prisma.$transaction([
    prisma.history.count({
      where: {
        user: {
          username: params.username,
        },
      },
    }),
    prisma.post.count({
      where: {
        user: {
          username: params.username,
        },
      },
    }),
  ]);

  return NextResponse.json(
    {
      historyCount: stats[0],
      postCount: stats[1],
    },
    {
      status: 200,
    },
  );
};
