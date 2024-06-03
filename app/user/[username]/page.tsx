"use client";
import { Avatar } from "@nextui-org/react";
import TriviaCard from "./TriviaCard";
import { useEffect, useState } from "react";
import { User } from "lucia";
import { Post } from "@/utils/types/post";

interface UserWithPosts extends User {
  posts: Post[];
}

const UserProfile = ({ params }: { params: { username: string } }) => {
  const [user, setUser] = useState<UserWithPosts | null>();

  useEffect(() => {
    fetch(`/api/user/${params.username}`, {
      method: "GET",
    })
      .then((response) => {
        response.json().then((data: UserWithPosts) => {
          setUser(data);
        });
      })
      .catch(() => {
        setUser(null);
      });
  }, [params.username]);
  return (
    <>
      {user == undefined ? (
        <p className="mt-24 text-center text-xl">Searching...</p>
      ) : !user.username ? (
        <p className="mt-24 text-center text-xl">User not found.</p>
      ) : (
        <>
          <div className="mt-10 flex flex-col items-center text-center">
            <Avatar
              isBordered
              color="primary"
              name={user.username}
              size="lg"
              className="mb-4"
            />
            <h2>{user.displayName}</h2>
            <p className="text-primary">@{user.username}</p>

            <p className="my-8 text-default-500">{user.bio}</p>
          </div>

          <main>
            <div className=" mx-auto mb-8 flex max-w-screen-lg flex-1 flex-wrap justify-center  gap-8">
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
      )}
    </>
  );
};

export default UserProfile;
