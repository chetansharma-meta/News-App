"use client";
import { Hero } from "@/components/Hero";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InfiniteNews } from "@/components/InfiniteNews";

export default function Home() {

  const { data: session } = useSession();
  const router = useRouter();
  console.log(session?.user);

  return (
    <>
      <div className="flex flex-1 flex-row justify-center w-full h-screen">
        <div className="flex justify-center items-center space-x-52 w-4/5">
          <div className="flex flex-col space-y-4">
            {session ? (
              <h1 className="text-4xl font-bold">
                Welcome Back{" "}
                {session?.user.fullname === "undefined undefined"
                  ? session.user.name
                  : session.user.fullname}
              </h1>
            ) : (
              <h1 className="text-4xl font-bold">Welcome to our News App</h1>
            )}
            <p className="text-lg">Get the latest news and updates</p>
            <div className="space-x-10 ">
              <button className="p-[3px] relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg" />
                <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                  <Link href={"/news"}>Explore News</Link>
                </div>
              </button>
              {session ? (
                <button className="px-8 py-1 border-2 border-black hover:translate-x-2 hover:-translate-y-1 dark:border-white uppercase bg-white text-black transition duration-200 text-md shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                  <Link href={"/search"}>Search</Link>
                </button>
              ) : (
                <button className="px-8 py-1 border-2 border-black hover:translate-x-2 hover:-translate-y-1 dark:border-white uppercase bg-white text-black transition duration-200 text-md shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                  <Link href={"/login"}>Login</Link>
                </button>
              )}
            </div>
          </div>

          <div className="">
            <Hero />
          </div>
        </div>
      </div>
      <div>
        <InfiniteNews />
      </div>
    </>
  );
}
