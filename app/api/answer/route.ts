import { validateRequest } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { Post } from "@/utils/types/post";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/login");
  }

  const body = await request.json();
  if (!body.id || !body.answer) return NextResponse.json({ status: 500 });

  const post = await prisma.post.findUnique({
    where: {
      id: body.id,
    },
  });

  if (!post) return NextResponse.json({}, { status: 400 });
  if (!post.answers) return NextResponse.json({}, { status: 500 });

  const answers = post.answers as Post["answers"];

  let correct = false;
  for (const answer of answers) {
    if (answer.answer === body.answer && answer.correct) {
      correct = true;
    }
  }

  await prisma.history.upsert({
    where: {
      userId_questionId: {
        userId: user.id,
        questionId: post.id,
      },
    },
    create: {
      userId: user.id,
      questionId: post.id,
      answer: body.answer,
      correct: correct,
    },
    update: {},
  });

  if (post.userId != user.id) {
    await prisma.user.update({
      where: {
        id: post.userId,
      },
      data: {
        points: {
          increment: 1,
        },
      },
    });

    if (correct) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          points: {
            increment: 1,
          },
        },
      });
    }
  }

  return NextResponse.json({ correct: correct }, { status: 200 });
};
