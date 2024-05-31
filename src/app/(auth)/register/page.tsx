import Navbar from "@/components/Navbar";
import { LampDemo } from "@/components/lamp";
import React from "react";
import Signup from "@/components/Signup";

export default function page() {
  return (
    <>
      <div>
        <LampDemo page={<Signup />} />
      </div>
    </>
  );
}
