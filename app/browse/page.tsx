"use client";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Post } from "@/utils/types/post";
import quizTags from "@/utils/tags";
import Question from "./question";

const TriviaCardPage = () => {
  const [questions, setQuestions] = useState<Post[]>([]);

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/browse?tags=${tags.join(",")}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((data: Post[]) => {
        setQuestions(data);
      });
    });
  }, [tags]);

  return (
    <div className="mx-auto max-w-lg space-y-8 p-8">
      <Select
        selectionMode="multiple"
        label="Select tags"
        name="tags"
        onSelectionChange={(keys) => {
          const selectedKeys = Array.from(keys) as string[];
          setTags(selectedKeys);
        }}
      >
        {quizTags.map((quizTag) => (
          <SelectItem key={quizTag.toLowerCase()}>{quizTag}</SelectItem>
        ))}
      </Select>
      {questions.map((question: Post, key) => (
        <Question {...question} key={key} />
      ))}
    </div>
  );
};

export default TriviaCardPage;
