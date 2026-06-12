"use client";
import React, { useState } from "react";
import { BadgePlus, LogIn, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

const Header = () => {
  const router = useRouter();
  // const [loggedIn, setLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const loggedIn = !!session?.user;

  const handleCreatePost = () => {
    if (loggedIn) {
      router.push("/create-post");
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <div className="w-full relative h-18 py-10 flex items-center justify-between px-20 border-b-2 border-neutral-400 rounded-b-2xl">
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="text-2xl font-bold">Sign in required</h2>

            <p className="mt-2 text-neutral-600">
              You need an account to create and publish posts on prepost.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border-2 border-black px-4 py-2 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => router.push("/sign-in")}
                className="rounded-md bg-purple-600 px-4 py-2 text-white border-2 border-black cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => router.push("/")}
        className="px-8 py-2 outline-2 outline-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer text-2xl font-extrabold text-amber-300 bg-purple-600 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] text-shadow-2xs/100 hover:rotate-2"
      >
        prepost
      </button>
      <div className="flex items-center justify-center px-4 py-2 rounded-3xl overflow-hidden bg-green-200 gap-1 border-2 border-transparent focus-within:border-green-500 transition-all duration-200">
        <Search className="text-neutral-500" />
        <input
          placeholder="Search"
          className="text-lg outline-0"
          type="search"
          name=""
          id=""
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={handleCreatePost}
          className={`flex px-2 py-1 text-sm bg-amber-300 items-center justify-center gap-2 outline-2 outline-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] `}
        >
          <BadgePlus size={15} className="stroke-2" />
          Create Post
        </button>
        <button
          onClick={() => {
            if (loggedIn) {
              signOut();
              router.push("/");
            } else {
              router.push("/sign-in");
            }
          }}
          className={`flex px-2 py-1 text-sm ${loggedIn ? "text-white bg-red-500" : "text-black bg-white"} items-center justify-center outline-2 outline-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] `}
        >
          {loggedIn ? (
            <div className="flex items-center justify-center gap-2">
              <LogOut size={15} />
              Logout
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <LogIn size={15} />
              Sign In
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
