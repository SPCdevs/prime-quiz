"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Login({ loginForm }: any) {
  const router = useRouter();
  const [state, formAction] = useFormState(loginForm, {
    message: "",
  });

  useEffect(() => {
    if (state.message == "success") {
      router.push("/");
    }
  }, [state.message, router]);

  const [isVisible, setIsVisible] = useState(false);

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
            <p className="text-danger-500">
              {state?.message == "success" ? "" : state?.message}
            </p>
          </CardBody>
        </Card>
      </form>
    </main>
  );
}
