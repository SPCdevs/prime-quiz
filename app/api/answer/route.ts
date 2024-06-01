import { getUser } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { User } from "lucia";

export const POST = async (request: Request) => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const body = await request.json();
  if(!body.post || !body.answer) return NextResponse.json({status: 500})

  const post = await prisma.post.findUnique({
    where: {
      id: body.post
    }
  })
  if(!post) return NextResponse.json({status: 400})
  
  if(!post.answers) return NextResponse.json({status: 500})
  const answers: any = JSON.parse(post.answers.toString());

  for(const answer in answers) {
    if(answers[answer].correct) {
      if(answers.indexOf(answer) === body.answer) {

        return NextResponse.json({status: 200, correct: true});
      }
    }
  }

  return NextResponse.json({
    status: 200,
    correct: false
  })
};
