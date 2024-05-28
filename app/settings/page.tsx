"use client";

import { useState } from "react";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { Tabs, Tab } from "@nextui-org/tabs";
import ProfileSettings from "./components/ProfileSettings";
import AccountSettings from "./components/AccountSettings";
import AppearanceSettings from "./components/AppearanceSettings";
import { User, Settings, SunMoon } from "lucide-react";

export default function Profile() {
  const [current, setCurrent] = useState("profile");
  const { windowWidth } = useWindowDimensions();
  return (
    <main>
      <div className="flex flex-col gap-4 p-8">
        <div className="border-b-1 border-default-200 pb-4 text-xl">
          <h3 className="text-2xl font-bold tracking-tight">Settings</h3>
          <p className="text-sm text-default-500">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row">
          <Tabs
            key="settings"
            color="primary"
            size="lg"
            radius="sm"
            variant="light"
            isVertical={windowWidth > 640}
            defaultSelectedKey={"profile"}
            onSelectionChange={(key) => {
              setCurrent(key.toString());
            }}
            className="block min-w-48"
          >
            <Tab
              key="profile"
              title={
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </div>
              }
              className="flex-col items-center sm:items-stretch"
            />
            <Tab
              key="account"
              title={
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Account
                </div>
              }
              className="flex-col items-center sm:items-stretch"
            />
            <Tab
              key="appearance"
              title={
                <div className="flex items-center">
                  <SunMoon className="mr-2 h-4 w-4" />
                  Appearance
                </div>
              }
              className="flex-col items-center sm:items-stretch"
            />
          </Tabs>
          <div className="w-full text-left text-3xl">
            {current === "profile" && <ProfileSettings />}
            {current === "account" && <AccountSettings />}
            {current === "appearance" && <AppearanceSettings />}
          </div>
        </div>
      </div>
    </main>
  );
}
