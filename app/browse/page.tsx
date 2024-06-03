"use client";
import { useEffect, useState, useRef } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Post } from "@/utils/types/post";
import quizTags from "@/utils/tags";
import Question from "./question";

const TriviaCardPage = () => {
  const [questions, setQuestions] = useState<Post[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [_currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/api/browse?tags=${tags.join(",")}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((data: Post[]) => {
        setQuestions(data);
        cardRefs.current = data.map(() => null);
      });
    });
  }, [tags]);

  const handleNextQuestion = (index: number) => {
    if (index < questions.length - 1) {
      setCurrentQuestionIndex(index + 1);
      setTimeout(() => {
        cardRefs.current[index + 1]?.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    }
  };

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <div ref={(el: any) => (cardRefs.current[key] = el)} key={key}>
          <Question
            {...question}
            onAnswerSelected={() => handleNextQuestion(key)}
          />
        </div>
      ))}
    </div>
  );
};

export default TriviaCardPage;
