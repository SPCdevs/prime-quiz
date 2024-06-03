"use client";
import { logoutAccount, deleteAccount } from "../actions";
import { Button } from "@nextui-org/button";

export default function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred account settings.
        </p>
      </div>

      <div className="flex gap-3">
        <form action={logoutAccount}>
          <Button type="submit" color="danger">
            Log out
          </Button>
        </form>
        <form action={deleteAccount}>
          <Button type="submit" color="danger" variant="flat">
            Delete Account
          </Button>
        </form>
      </div>
    </div>
  );
}
