"use client";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { changeProfile } from "../actions";
import { User as UserComponent } from "@nextui-org/user";
import { User } from "lucia";
import { useState } from "react";

export default function ProfileSettings({ user }: { user: User }) {
  const [displayName, setDisplayName] = useState(user.displayName);

  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>
      <UserComponent
        name={displayName}
        description={`@${user.username}`}
        classNames={{
          description: "text-primary",
        }}
      />
      <form action={changeProfile} className="w-5/6 space-y-4">
        <Input
          name="displayName"
          label="Display Name"
          value={displayName}
          variant="bordered"
          onValueChange={(value) => {
            setDisplayName(value);
          }}
        />
        <Textarea
          name="bio"
          label="Bio"
          variant="bordered"
          placeholder="Tell bit about your self."
          value={user.bio}
        />
        <Button type="submit" color="primary" variant="flat">
          Save
        </Button>
      </form>
    </div>
  );
}
