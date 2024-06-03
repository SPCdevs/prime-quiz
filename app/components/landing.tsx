"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-5xl font-bold">
        Unlock the Full Potential of PrimeQuiz
      </h1>
      <p className="mb-8 text-lg">
        Sign up to access exclusive features and content.
      </p>
      <div className="flex gap-4">
        <Button as={Link} color="primary" className="px-4" href="/signup">
          Sign Up
        </Button>
        <Button as={Link} color="primary" className="px-4" href="/login">
          Login
        </Button>
      </div>
    </div>
  );
}
