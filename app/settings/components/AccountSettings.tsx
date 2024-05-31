"use client";
import { logoutAccount } from "../actions";
import { Button } from "@nextui-org/button";

export default function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>

      <div className="flex gap-3">
        <Button type="submit" onClick={() => logoutAccount()} color="danger">
          Log out
        </Button>
        <Button color="danger" variant="flat">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
