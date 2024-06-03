import { getUser } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getUser();

  if (!user) {
    return redirect("/login");
  }

  const histories = await prisma.history.findMany({
    where: {
      userId: user.id,
    },
    include: {
      question: true,
    },
  });

  return NextResponse.json(histories, {
    status: 200,
  });
};
