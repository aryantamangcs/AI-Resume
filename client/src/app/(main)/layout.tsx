import { MainNavBar } from "@/components/NavBar";
import { FC } from "react";
import React from "react";
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <MainNavBar />
      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
