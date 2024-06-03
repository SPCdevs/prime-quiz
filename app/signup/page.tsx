"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Eye, EyeOff } from "lucide-react";
import { User } from "@nextui-org/user";

import { signUp } from "./actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [username, setValue1] = useState("username");
  const [displayName, setValue2] = useState("Display Name");

  const [state, formAction] = useFormState(signUp, {
    message: "",
  });

  useEffect(() => {
    if (state.message == "success") {
      router.push("/");
    }
  }, [state.message, router]);

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
          <form action={formAction} className="flex flex-col gap-4">
            <Input
              isRequired
              label="Username"
              name="username"
              labelPlacement="outside"
              onValueChange={setValue1}
              variant="underlined"
            />
            <Input
              isRequired
              label="Display Name"
              name="displayName"
              labelPlacement="outside"
              onValueChange={setValue2}
              variant="underlined"
            />
            <Input
              isRequired
              type="email"
              label="Email"
              name="email"
              labelPlacement="outside"
              variant="underlined"
            />
            <Input
              isRequired
              type={isVisible ? "text" : "password"}
              label="Password"
              name="password"
              labelPlacement="outside"
              variant="underlined"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <EyeOff className="pointer-events-none text-2xl text-default-400" />
                  ) : (
                    <Eye className="pointer-events-none text-2xl text-default-400" />
                  )}
                </button>
              }
            />
            <Button type="submit" color="primary" variant="flat">
              Continue
            </Button>
            <p className="text-danger-500">
              {state?.message == "success" ? "" : state?.message}
            </p>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
