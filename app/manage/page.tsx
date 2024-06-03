import { redirect } from "next/navigation";
import Tabs from "./actions/tabs";
import { getUser } from "@/utils/database/auth";

const Profile = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <div className="flex flex-col gap-4 p-8">
        <div className="border-b-1 border-default-200 pb-4 text-xl">
          <h3 className="text-2xl font-bold tracking-tight">Manage</h3>
          <p className="text-sm text-default-500">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Tabs user={user} />
      </div>
    </main>
  );
};

export default Profile;
