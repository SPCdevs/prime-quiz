"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import TriviaCard from "./TriviaCard";

import { User } from "lucia";
import { Post } from "@/utils/types/post";

interface UserWithPosts extends User {
  posts: Post[];
}

const UserProfile = ({ params }: { params: { username: string } }) => {
  const [user, setUser] = useState<UserWithPosts | null>(null);
  const [stats, setStats] = useState({
    historyCount: 0,
    postCount: 0,
  });

  useEffect(() => {
    fetch(`/api/user/${params.username}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: UserWithPosts) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, [params.username]);

  useEffect(() => {
    if (user) {
      fetch(`/api/user/${user.username}/stats`)
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
        });
    }
  }, [user]);

  if (user === undefined) {
    return <p className="mt-24 text-center text-xl">Searching...</p>;
  }

  if (user === null || !user.username) {
    return <p className="mt-24 text-center text-xl">User not found.</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h1 className="mb-4 text-5xl font-bold">
          <span className="text-primary">{user.displayName}</span>
        </h1>
        <p className="text-primary">@{user.username}</p>
        <p className="mb-8 text-lg">{user.bio}</p>

        <p className="text-8xl font-bold text-primary">{user.points}</p>
        <div className="flex items-center">
          <Trophy className="mr-2 text-success" /> Points
        </div>
        <div className="mt-6 flex gap-6">
          <Card className="flex-1 p-2">
            <CardBody className="flex flex-col justify-between text-center">
              <h2 className="text-xl font-bold">
                Trivia <br /> Created
              </h2>
              <div className="mt-2 text-6xl font-bold text-primary">
                {stats.postCount}
              </div>
            </CardBody>
          </Card>
          <Card className="flex-1 p-2">
            <CardBody className="flex flex-col justify-between text-center">
              <h2 className="text-xl font-bold">Trivia Answered</h2>
              <div className="mt-2 text-6xl font-bold text-primary">
                {stats.historyCount}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <main>
        <div className="mx-auto mb-8 flex max-w-screen-lg flex-1 flex-wrap justify-center gap-8">
          {user.posts.length === 0 ? (
            <p className="text-center text-gray-500">
              This user has not created any trivia questions yet.
            </p>
          ) : (
            user.posts.map((question, key) => (
              <TriviaCard question={question} key={key} />
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default UserProfile;
