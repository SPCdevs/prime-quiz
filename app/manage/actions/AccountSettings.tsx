"use client";
import { useEffect } from "react";
import { logoutAccount, deleteAccount } from "../actions";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

export default function AccountSettings() {
  const router = useRouter();
  const [logoutAccountState, logoutAccountForm] = useFormState(logoutAccount, {
    message: "",
  });
  const [deleteAccountState, deleteAccountForm] = useFormState(deleteAccount, {
    message: "",
  });

  useEffect(() => {
    if (
      logoutAccountState.message == "success" ||
      deleteAccountState.message == "success"
    ) {
      router.replace("/");
    }
  }, [logoutAccountState, deleteAccountState, router]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred account settings.
        </p>
      </div>

      <div className="flex gap-3">
        <form action={logoutAccountForm}>
          <Button type="submit" color="danger">
            Log out
          </Button>
        </form>
        <form action={deleteAccountForm}>
          <Button type="submit" color="danger" variant="flat">
            Delete Account
          </Button>
        </form>
      </div>
    </div>
  );
}
