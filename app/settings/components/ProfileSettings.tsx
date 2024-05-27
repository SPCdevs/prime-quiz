"use client";

import { User } from "@nextui-org/user";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <User
        name="Jane Doe"
        description={<div className="text-primary">@uesrname</div>}
      />
      <Textarea
        label="Bio"
        variant="bordered"
        placeholder="Tell bit about your self."
        classNames={{
          base: "max-w-xs",
          input: "resize-y min-h-[40px]",
        }}
      />
      <Button color="primary" variant="bordered">
        Save
      </Button>
    </div>
  );
}
