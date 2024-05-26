import { Providers } from "./providers";
import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "./components/nav";

export const metadata: Metadata = {
  title: "PrimeQuiz",
  description: "get addicted to learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <NavigationBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
