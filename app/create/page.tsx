import { getUser } from "@/utils/database/auth";
import { redirect } from "next/navigation";
import CreateForm from "./form";

const Page = async () => {
  const user = getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-screen-md p-8">
      <h1 className="pb-8 text-center text-3xl font-bold">Create a trivia</h1>
      <CreateForm />
    </div>
  );
};

export default Page;
