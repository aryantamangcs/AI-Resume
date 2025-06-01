import { Logo } from "@/components/common/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { UserButton } from "@clerk/nextjs";

export const MainNavBar = () => {
  return (
    <header className="flex items-center justify-between ">
      <div>
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButton
          appearance={{
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
  );
};
