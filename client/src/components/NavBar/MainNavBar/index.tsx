import { Logo } from "@/components/common/Logo";
import { UserButton } from "@clerk/nextjs";

export const MainNavBar = () => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <Logo />
      </div>
      <div>
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
