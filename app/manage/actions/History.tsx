"use client";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

interface Answer {
  answer: string;
  correct: boolean;
}

interface Question {
  id: string;
  title: string;
  userId: string;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

interface HistoryItem {
  userId: string;
  questionId: string;
  answer: string;
  correct: boolean;
  question: Question;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    fetch("/api/history", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: HistoryItem[]) => {
        setHistory(data);
      });
  }, []);

  return (
    <main>
      <div>
        <h3 className="text-lg font-medium">History</h3>
        <p className="text-muted-foreground text-sm">
          Take a look at trivia questions you have done.
        </p>
      </div>
      <div className="my-8 flex flex-wrap gap-4">
        {history.length === 0 ? (
          <p className="text-center text-gray-500">
            You {"haven't"} done any trivia questions yet. Go and try some!
          </p>
        ) : (
          history.map((post, key) => (
            <Card key={key} className="min-w-96 max-w-96 flex-1 p-4">
              <h4>{post.question.title}</h4>
              {post.question.answers.map((ans) => (
                <Button
                  key={ans.answer}
                  variant="flat"
                  className="my-2"
                  color={
                    ans.answer === post.answer
                      ? post.correct
                        ? "success"
                        : "danger"
                      : ans.correct && !post.correct
                        ? "primary"
                        : "default"
                  }
                >
                  {ans.answer}
                </Button>
              ))}
              <h3>
                Your Answer: <strong>{post.answer}</strong> (
                {post.correct ? "Correct" : "Incorrect"})
              </h3>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
