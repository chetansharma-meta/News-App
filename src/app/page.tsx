"use client"
import {useSession, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Home() {
  const {data: session} = useSession();
  const router = useRouter();
  return (
    <div className="flex flex-1 flex-col justify-center items-center mt-20 ">
      <h1 className="text-4xl">Welcome to News Blog</h1>
      <p className="text-lg mt-4">This is a simple news blog</p>

      <div className="mt-8">
        {session ? (<button
          onClick={() => {
            signOut();
          }}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Logout
        </button>) : (
          
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        
        )}
        </div>
    </div>
  );
}
