import { getUser } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (request: NextRequest) => {
  const user = await getUser();

  const searchedTags = request.nextUrl.searchParams.get("tags")?.split(",");

  let tags: { name: string }[] = [];
  if (searchedTags && searchedTags[0] != "") {
    tags = searchedTags.map((tag: string) => {
      return {
        name: tag,
      };
    });
  }

  const posts = await prisma.post.findMany({
    where: {
      tags:
        tags.length > 0
          ? {
              some: {
                OR: tags,
              },
            }
          : undefined,
    },
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
          userId: user?.id,
        },
        select: {
          answer: true,
          correct: true,
        },
      },
      tags: {
        select: {
          name: true,
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
