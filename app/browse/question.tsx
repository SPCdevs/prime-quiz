"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Post } from "@/utils/types/post";
import { Link } from "@nextui-org/link";

const Question = (post: Post, key: number) => {
  const [_selectedAnswer, setSelectedAnswer] = useState("");

  const userLink = `/user/${post.user.username}`;
  const createdAt = new Date(post.createdAt);

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
              onClick={() => setSelectedAnswer(answer.answer)}
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
