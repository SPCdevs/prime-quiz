"use client";

import { User } from "@nextui-org/user";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function ProfileSettings() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <User
        name="Display Name"
        description={<div className="text-primary">@uesrname</div>}
      />
      <Textarea
        label="Bio"
        variant="bordered"
        placeholder="Tell bit about your self."
        className="min-h-[40px] w-5/6 resize-y"
      />
      <Button color="primary" variant="flat">
        Save
      </Button>
    </div>
  );
}
