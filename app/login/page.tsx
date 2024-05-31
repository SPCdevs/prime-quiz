"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";

import { login } from "./actions";
import { useFormState } from "react-dom";

import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [state, formAction] = useFormState(login, {
    message: "",
  });
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <main className="flex items-center justify-center ">
      <form action={formAction}>
        <Card className="mt-[20vh] w-[400px] p-8">
          <CardBody className="flex flex-col gap-4">
            <h1 className="text-center text-3xl font-bold ">Login</h1>
            <Input
              type="email"
              name="email"
              label="Email"
              labelPlacement="outside"
              variant="underlined"
            />

            <Input
              name="password"
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
            />
            <Button color="primary" type="submit" variant="flat">
              Continue
            </Button>
            <p className="text-danger-500">{state.message}</p>
          </CardBody>
        </Card>
      </form>
    </main>
  );
}
