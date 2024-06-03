"use client";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Post } from "@/utils/types/post";

export default function History() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadNewPosts();
  }, []);

  const loadNewPosts = () => {
    fetch("/api/posts", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: Post[]) => {
        setPosts(data);
      });
  };

  const deletePost = (postId: string) => {
    fetch("/api/delete", {
      body: JSON.stringify({
        id: postId,
      }),
      method: "post",
    }).then(() => {
      loadNewPosts();
    });
  };

  return (
    <main>
      <div>
        <h3 className="text-lg font-medium">Manage</h3>
        <p className="text-muted-foreground text-sm">
          These are trivia that {"you've"} created. You can delete them here.
        </p>
      </div>
      <div className="my-8 flex flex-wrap gap-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            You {"haven't"} created any trivia questions yet. Go and create
            some!
          </p>
        ) : (
          posts.map((post, key) => (
            <Card key={key} className="min-w-96 max-w-96 flex-1 p-4">
              <CardHeader>{post.title}</CardHeader>
              <CardBody>
                {post.answers.map((ans) => (
                  <Button
                    key={ans.answer}
                    variant="flat"
                    className="my-2"
                    color="default"
                  >
                    {ans.answer}
                  </Button>
                ))}
              </CardBody>
              <CardFooter>
                <Button
                  className="w-full"
                  variant="flat"
                  color="danger"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}
