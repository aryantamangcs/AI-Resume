import { MainNavBar } from "@/components/NavBar";
import { FC } from "react";
import React from "react";
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <MainNavBar />
      {children}
    </div>
  );
};

export default Layout;
