"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { useState } from "react";
import ProfileSettings from "./components/ProfileSettings";
import AccountSettings from "./components/AccountSettings";
import AppearanceSettings from "./components/AppearanceSettings";

export default function Profile() {
  const [current, setCurrent] = useState("profile");

  return (
    <main>
      <div className="grid grid-cols-2 p-8">
        <div className="col-span-2 border-b-1 border-default-200 pb-4 text-xl ">
          <h3 className="text-2xl font-bold tracking-tight">Settings</h3>
          <p className="text-sm text-default-500">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="max-w-fit p-4 pl-0">
            <Tabs
              key="settings"
              color="primary"
              size="lg"
              radius="sm"
              variant="light"
              isVertical
              defaultSelectedKey={"profile"}
              onSelectionChange={(key) => {
                setCurrent(key.toString());
              }}
              className="block min-w-48"
            >
              <Tab
                key="profile"
                title="Profile"
                className="justify-start text-left"
              />
              <Tab
                key="account"
                title="Account"
                className="justify-start text-left"
              />
              <Tab
                key="appearance"
                title="Appearance"
                className="justify-start text-left"
              />
            </Tabs>
          </div>
          <div className="w-full">
            <div className="py-4 text-left text-3xl">
              {current === "profile" && <ProfileSettings />}
              {current === "account" && <AccountSettings />}
              {current === "appearance" && <AppearanceSettings />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
