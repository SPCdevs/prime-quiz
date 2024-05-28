"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <main className="flex items-center justify-center ">
      <Card className="m-8 mt-[20vh] w-[400px] flex-col p-8">
        <CardBody>
          <p className="pb-5 text-center text-3xl font-bold">Login</p>
          <div className="w-full flex-wrap gap-4 md:flex-nowrap">
            <Input
              type="email"
              label="Email"
              variant="underlined"
              labelPlacement="outside"
              className="pb-5"
            />
          </div>

          <Input
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
