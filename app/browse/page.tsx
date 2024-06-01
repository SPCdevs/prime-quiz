"use client";
import { Post } from "@/utils/types/post";
import { useEffect, useState } from "react";
import Question from "./question";

const TriviaCardPage = () => {
  const [questions, setQuestions] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/browse", {
      method: "GET",
    }).then((response) => {
      response.json().then((data: Post[]) => {
        setQuestions(data);
      });
    });
  }, []);

  return (
    <div className="mx-auto max-w-lg space-y-8 p-8">
      {questions.map((question: Post, key) => (
        <Question {...question} key={key} />
      ))}
    </div>
  );
};

export default TriviaCardPage;
