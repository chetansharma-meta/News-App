"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { UploadDemo } from "@/components/UploadDemo";

interface QueryParams {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string;
  id?: string;
}

const EditNews: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const title = searchParams.get("title") || "";
  const content = searchParams.get("content") || "";
  const author = searchParams.get("author") || "";
  const category = searchParams.get("category") || "";
  const tags = (searchParams.get("tags") || "").split(",");

  console.log("ID", id);
  console.log("Title", title);
  console.log("Content", content);
  console.log("Author", author);
  console.log("Category", category);
  console.log("Tags", tags);

  return (
    <div className="flex mt-20 justify-center h-full w-full">
      <div className="flex w-full text-black my-20 h-full align-middle justify-center items-center">
        <UploadDemo
          id={id}
          title={title}
          content={content}
          category={category}
          tags={tags}
        />
      </div>
    </div>
  );
};

export default EditNews;
