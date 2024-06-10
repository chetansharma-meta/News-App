import React from "react";
import { News } from "@/components/News";
import { Suspense } from "react";

function page() {
  return (
    <div className="m-12">  
      <Suspense>
        <News />
      </Suspense>
    </div>
  );
}

export default page;
