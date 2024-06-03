"use client";
import { Post } from "@/utils/types/post";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/history", {
      method: "GET",
    }).then((response) => {
      response.json().then((data: any[]) => {
        setHistory(data)
        console.log(data);
      });
    });
  }, []);
  return (
    <main>
      <h1 className="pt-12 text-center text-3xl font-bold">
        History
      </h1>
      <div className="mx-auto max-w-lg space-y-8 p-8">
        {
          history.map((post: any, key) => (
            <h4 key={key}>{post.question.title}</h4>
          ))
        }
      </div>
    </main>
  )
}