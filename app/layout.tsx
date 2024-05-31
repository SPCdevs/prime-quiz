import type { Metadata } from "next";
import { Providers } from "./providers";
import NavigationBar from "./components/nav";
import { getUser } from "@/utils/database/auth";
import "./globals.css";
import { User } from "lucia";

export const metadata: Metadata = {
  title: "PrimeQuiz",
  description: "get addicted to learning.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user: User | null = await getUser();
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <NavigationBar user={user} />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
