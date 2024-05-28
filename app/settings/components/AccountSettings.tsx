"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function AccountSettings() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-muted-foreground text-sm">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Input
        variant="bordered"
        label="Display Name"
        placeholder="My Name Here"
      />
      <Input
        type="email"
        variant="bordered"
        label="Email"
        placeholder="MyEmailHere@mail.com"
      />
      <span className="pt-2 text-lg">Profile picture</span>
      <input
        type="file"
        name="image"
        className="file:font-regular block w-full text-sm text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-200/80 file:px-4 file:py-2 file:text-sm file:text-blue-600 hover:file:bg-blue-200/70 dark:file:bg-primary dark:file:bg-primary/20 dark:file:text-primary hover:dark:file:bg-primary/15"
      />

      <div className="flex gap-3">
        <Button color="primary" variant="flat">
          Save Changes
        </Button>
        <Button color="danger" variant="flat">
          Reset Password
        </Button>
        <Button color="danger" variant="flat">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
