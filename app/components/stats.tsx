"use client";

import { User } from "lucia";
import { Card, CardBody } from "@nextui-org/react";
import { Trophy, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function StatsPage({ user }: { user: User }) {
  const [stats, setStats] = useState({
    historyCount: 0,
    postCount: 0,
  });

  useEffect(() => {
    fetch(`/api/user/${user.username}/stats`).then((res) => {
      res.json().then((data) => {
        setStats(data);
      });
    });
  }, [user.username]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-5xl font-bold">
        Welcome, <span className="text-primary">{user.displayName}</span>.
      </h1>
      <p className="mb-8 text-lg">Here are some of your stats!</p>

      <p className="text-8xl font-bold text-primary">{user.points}</p>
      <div className="flex items-center">
        <Trophy className="mr-2 text-success" /> Points
      </div>
      <Card className="mt-10 px-8">
        <CardBody className="flex flex-row items-center">
          <Info className="h-5 w-5 text-slate-500" />
          <span className="pl-5">
            Earn a point when you complete a trivia and get it right,
            <br />
            or when someone does one of your trivia questions.
          </span>
        </CardBody>
      </Card>
      <div className="mt-6 flex gap-6 ">
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
  );
}
