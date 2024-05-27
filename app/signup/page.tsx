"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { User } from "@nextui-org/user";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [username, setValue1] = useState("username");
  const [displayName, setValue2] = useState("Display Name");
  return (
    <main className="flex items-center justify-center">
      <Card className="w-[400px] flex-col p-8">
        <CardBody>
          <p className="pb-5 text-center text-3xl font-bold">Sign Up</p>
          <User
            name={displayName}
            description={<div className="text-primary">@{username}</div>}
            className="truncate text-ellipsis pb-5"
          />
          <div className="w-full flex-wrap gap-4 md:flex-nowrap">
            <Input
              isRequired
              type="username"
              label="Username"
              description="This can not be changed later."
              variant="underlined"
              labelPlacement="outside"
              className="pb-5"
              value={username}
              onValueChange={setValue1}
            />
          </div>
          <div className="w-full flex-wrap gap-4 md:flex-nowrap">
            <Input
              isRequired
              type="text"
              label="Display Name"
              variant="underlined"
              labelPlacement="outside"
              className="pb-5"
              value={displayName}
              onValueChange={setValue2}
            />
          </div>
          <div className="w-full flex-wrap gap-4 md:flex-nowrap">
            <Input
              isRequired
              type="email"
              label="Email"
              variant="underlined"
              labelPlacement="outside"
              className="pb-5"
            />
          </div>

          <Input
            isRequired
            label="Password"
            labelPlacement="outside"
            variant="underlined"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOff className="pointer-events-none text-2xl text-default-400" />
                ) : (
                  <Eye className="pointer-events-none text-2xl text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className="pb-5"
          />
          <Button color="primary" variant="flat">
            Continue
          </Button>
        </CardBody>
      </Card>
    </main>
  );
}
