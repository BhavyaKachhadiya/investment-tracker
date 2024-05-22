"use client";
import { signIn } from "next-auth/react";
import React from "react";
const page = () => {

  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };
  return (
    <>
      <div className="mt-5">
        <button
          className="py-1 px-2 bg-blue w-[100%] border-0 rounded-md"
          onClick={handleSignInWithGoogle}
        >
          Login with Google
        </button>
      </div>
    </>
  );
};

export default page;
