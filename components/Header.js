import {
  HeartIcon,
  HomeIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

function Header() {
  //data session in next auth
  const { data: session } = useSession();
  //router in next router
  const router = useRouter();

  return (
    <div className="sticky top-0 w-screen bg-white shadow-sm border-b z-50 ">
      <div className="flex justify-between max-w-6xl  xl:mx-auto items-center p-2">
        {/* Left  */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid h-12 w-24 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative h-12 w-12 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          ></Image>
        </div>

        {/* Middle */}
        <div className="flex items-center p-1 border-2 rounded-md mx-1">
          <SearchIcon className="h-5 w-10 text-gray-400 cursor-pointer" />
          <input
            className="border-transparent h-8 focus:ring-transparent focus:border-transparent"
            type="text"
            placeholder="Search"
          ></input>
        </div>

        {/* Right */}
        <div className="flex items-center justify-end xl:space-x-4 sm:space-x-3">
          <Link href="/">
            <a className={clsx({active: router.pathname == "/"})}>
              <HomeIcon className="navBtn"></HomeIcon>
            </a>
          </Link>
          {session ? (
            <>
              <MenuIcon className="h-8 w-8 md:hidden"></MenuIcon>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45"></PaperAirplaneIcon>
                <div className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 text-sm flex items-center justify-center">
                  1
                </div>
              </div>
              <PlusCircleIcon className="navBtn"></PlusCircleIcon>
              <UserGroupIcon className="navBtn"></UserGroupIcon>
              <HeartIcon className="navBtn"></HeartIcon>
              <img
                className="h-10 w-10 object-contain border-2 rounded-full cursor-pointer"
                src={session.user?.image}
              ></img>
            </>
          ) : (
            <button onClick={signIn} className="font-medium text-xl ">
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
