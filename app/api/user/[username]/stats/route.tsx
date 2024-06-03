import { prisma } from "@/utils/database/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (
  _request: NextRequest,
  { params }: { params: { username: string } },
) => {
  const historyCount = await prisma.history.count({
    where: {
      username: params.username,
    }
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
