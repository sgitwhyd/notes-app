import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "flowbite-react";
import Navbar from "./Navbar";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const { data: session, status } = useSession();

  const handleSignOut = () => {
    setIsLoading(true);
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <>
      <Navbar />
      <main
        className="mx-auto flex w-full max-w-5xl flex-col justify-center py-6
px-9 md:py-6 md:px-4  "
      >
        {/* {session && (
        <>
          <Image
            src={session?.user?.image as string}
            alt={session?.user?.name as string}
            width={100}
            height={100}
          />
          <h1>{session?.user?.name}</h1>
          <Button onClick={handleSignOut} className=" w-fit flex">
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Sign Out
          </Button>
        </>
      )} */}
        {children}
      </main>
    </>
  );
};

export default PageLayout;
