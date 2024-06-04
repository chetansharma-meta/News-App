"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadDemo } from "@/components/UploadDemo";

const EditPage = ({ params }: {}) => {
  return (
    <div>
      <UploadDemo
        id={id}
        title={title}
        content={content}
        category={category}
        tags={tags}
      />
    </div>
  );
};
