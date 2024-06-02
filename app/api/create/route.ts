import { getUser } from "@/utils/database/auth";
import { prisma } from "@/utils/database/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(1).max(500),
  options: z
    .array(
      z.object({
        correct: z.boolean(),
        answer: z.string().max(200),
      }),
    )
    .refine(
      (options) => {
        // this refine checks if only 1 option is set to correct. having multiple set to correct will throw an error.
        // if there are no correct options set, will also throw an error.

        let correctAnswerSet = false;

        for (const option of options) {
          if (option.correct) {
            if (correctAnswerSet == true) {
              return false;
            }
            correctAnswerSet = true;
          }
        }

        return correctAnswerSet;
      },
      { message: "More than 1, or no options are set to correct." },
    ),
});

export const POST = async (request: Request) => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const post = postSchema.safeParse(await request.json());

  if (post.error) {
    return NextResponse.json(
      {
        message: post.error.message,
      },
      {
        status: 400,
      },
    );
  }

  await prisma.post.create({
    data: {
      userId: user.id,
      title: post.data.title,
      answers: post.data.options,
    },
  });

  revalidatePath("/browse");
  return redirect("/browse");
};
