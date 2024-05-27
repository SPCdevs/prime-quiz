"use client";

import { Input } from "@nextui-org/input";
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
      <input
        type="file"
        name="image"
        className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-primary dark:file:text-white"
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
