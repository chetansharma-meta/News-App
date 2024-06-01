import Navbar from "@/components/Navbar";
import React from "react";
import {Signup} from "@/components/Signup";

export default function page() {
  return (
    <>
      <div className="h-screen pt-20">
        <Signup />
      </div>
    </>
  );
}
