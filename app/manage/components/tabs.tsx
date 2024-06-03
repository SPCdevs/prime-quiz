"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";
import AppearanceSettings from "./AppearanceSettings";
import History from "./history";
import { UserIcon, Settings, SunMoon, HistoryIcon } from "lucide-react";
import { User } from "lucia";

const TabsMenu = ({ user }: { user: User }) => {
  return (
    <Tabs
      key="settings"
      color="primary"
      size="lg"
      variant="light"
      isVertical={true}
      defaultSelectedKey="profile"
      classNames={{
        tabList: "flex-row sm:flex-col min-w-48 pb-4",
        wrapper: "flex-col sm:flex-row",
        panel: "w-full",
      }}
    >
      <Tab
        key="profile"
        title={
          <div className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            Profile
          </div>
        }
      >
        <ProfileSettings user={user} />
      </Tab>
      <Tab
        key="history"
        title={
          <div className="flex items-center">
            <HistoryIcon className="mr-2 h-4 w-4" />
            History
          </div>
        }
      >
        <History />
      </Tab>
      <Tab
        key="account"
        title={
          <div className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Account
          </div>
        }
      >
        <AccountSettings />
      </Tab>
      <Tab
        key="appearance"
        title={
          <div className="flex items-center">
            <SunMoon className="mr-2 h-4 w-4" />
            Appearance
          </div>
        }
      >
        <AppearanceSettings />
      </Tab>
    </Tabs>
  );
};

export default TabsMenu;
