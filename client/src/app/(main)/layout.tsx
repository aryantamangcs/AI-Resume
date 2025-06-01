import { MainNavBar } from "@/components/NavBar";
import { FC } from "react";
import React from "react";
const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="p-4">
      <MainNavBar />
      {children}
    </div>
  );
};

export default Layout;
