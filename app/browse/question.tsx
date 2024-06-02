"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useState, useEffect } from "react";
import { Post } from "@/utils/types/post";

const Question = (post: Post, key: number) => {
  const [selectedAnswer, setSelectedAnswer] = useState<{
    answer: string;
    correct: boolean | null;
  }>({
    answer: "",
    correct: null,
  });
  const userLink = `/user/${post.user.username}`;
  const createdAt = new Date(post.createdAt);

  useEffect(() => {
    if (post.history.length > 0) {
      setSelectedAnswer(post.history[0]);
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
        setSelectedAnswer({
          answer: ans,
          correct: data.correct,
        });
      });
    });
  };

  return (
    <Card className="min-h-96" key={key}>
      <CardBody className="space-y-2 p-8">
        <p>
          <Link underline="hover" href={userLink}>
            @{post.user.displayName}
          </Link>
          | On {createdAt.toLocaleDateString()}
        </p>
        <h3 className="text-3xl font-bold ">{post.title}</h3>
        <div className="flex flex-col gap-4 pt-8">
          {post.answers.map((answer, index) => (
            <Button
              key={index}
              variant="flat"
              color={
                selectedAnswer.answer == answer.answer
                  ? selectedAnswer.correct
                    ? "success"
                    : selectedAnswer.correct === false
                      ? "danger"
                      : "default"
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
    </Card>
  );
};
export default Question;
