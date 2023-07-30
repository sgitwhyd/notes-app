import React from "react";
import Navbar from "./Navbar";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-full min-h-screen text-white bg-slate-800 w-full mx-auto md:px-12">
        {children}
      </div>
    </>
  );
};

export default RootLayout;
