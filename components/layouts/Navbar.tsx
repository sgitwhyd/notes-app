import React, { useMemo } from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Link from "next/link";

export const getServeSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

const Navbar = () => {
  const { data: session, status } = useSession();

  const isUserLoggedIn = useMemo(() => {
    return status === "authenticated";
  }, [status]);

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex justify-between mt-5">
      <Link href={"/"} className="font-semibold text-xl">
        Notes App
      </Link>
      <div>
        {isUserLoggedIn ? (
          <div className="flex gap-3">
            <p>
              {session?.user?.name} ({session?.user?.email})
            </p>
            <button className="" onClick={handleSignOut}>
              logout
            </button>
          </div>
        ) : status === "loading" ? (
          "authenticating"
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => Router.push("api/auth/signin")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
