import React from "react";
import {UploadDemo} from "@/components/UploadDemo";

function page() {
  return (
    <div className="flex mt-20 justify-center h-full w-full">
      <div className="flex w-full text-black my-20 h-full align-middle justify-center items-center">
        <UploadDemo />
      </div>
    </div>
  );
}

export default page;
