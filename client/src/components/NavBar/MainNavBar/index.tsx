"use client";
import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export const MainNavBar = () => {
  const { theme } = useTheme();
  return (
    <div className="w-screen px-4 py-1 border-b flex justify-center">
      <header className="flex items-center justify-between w-screen max-w-[1000px]">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 35,
                  height: 35,
                },
              },
            }}
          />
        </div>
      </header>
    </div>
  );
};
