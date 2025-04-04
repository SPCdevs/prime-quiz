"use client";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useState, useEffect } from "react";
import { Post } from "@/utils/types/post";
import { useRouter } from "next/navigation";

interface QuestionProps extends Post {
  onAnswerSelected: () => void;
}

const Question = (post: QuestionProps) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState<{
    answer: string;
    correct: boolean | null;
    correctAnswer: string | null;
  }>({
    answer: "",
    correct: null,
    correctAnswer: null,
  });

  const userLink = `/user/${post.user.username}`;
  const createdAt = new Date(post.createdAt);

  const tagsList = post.tags.map((tag) => tag.name);

  useEffect(() => {
    if (post.history.length > 0) {
      setSelectedAnswer({
        answer: post.history[0].answer,
        correct: post.history[0].correct,
        correctAnswer: post.history[0].correctAnswer,
      });
    }
  }, [post.history]);

  const selectAnswer = (ans: string) => {
    fetch("/api/answer", {
      body: JSON.stringify({
        id: post.id,
        answer: ans,
      }),
      method: "post",
    }).then((res) => {
      res.json().then((data) => {
        if (data?.message == "not logged in") {
          router.push("/login");
        }
        setSelectedAnswer({
          answer: ans,
          correct: data.correct,
          correctAnswer: data.correctAnswer,
        });
        if (data.correct !== null) {
          post.onAnswerSelected();
        }
      });
    });
  };

  return (
    <Card className="min-h-96">
      <CardBody className="space-y-2 p-8 pb-0">
        <p className="flex justify-between">
          <span className="text-left">
            <Link underline="hover" href={userLink}>
              @{post.user.displayName}
            </Link>
          </span>
          <span className="text-right"> {createdAt.toLocaleDateString()} </span>
        </p>
        <h3 className="text-3xl font-bold">{post.title}</h3>
        <div className="flex flex-col gap-4 pt-8">
          {post.answers.map((answer, index) => (
            <Button
              key={index}
              variant="flat"
              color={
                selectedAnswer.answer === answer.answer
                  ? selectedAnswer.correct
                    ? "success"
                    : "danger"
                  : answer.correct && selectedAnswer.correct === false
                    ? "primary"
                    : "default"
              }
              disabled={!(selectedAnswer.correct === null)}
              onClick={() => selectAnswer(answer.answer)}
            >
              {answer.answer}
            </Button>
          ))}
        </div>
      </CardBody>
      <CardFooter className="p-8 pt-4 ">
        Tags:{" "}
        <span className="whitespace-pre text-primary">
          {" "}
          {tagsList.join(", ")}
        </span>
      </CardFooter>
    </Card>
  );
};

export default Question;
