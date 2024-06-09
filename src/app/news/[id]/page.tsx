"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewsCard } from "@/components/NewsCard";
import { useSession } from "next-auth/react";
import { Comments } from "@/components/Comments";

const ArticleDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [author, setAuthor] = useState("");
  const [authorID, setAuthorID] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetch(`/api/news/${id}`);
      const data = await res.json();
      setArticle(data);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setTags(data.tags);
      setAuthor(data.author.firstname + " " + data.author.lastname);
      setAuthorID(data.author._id);
      setTime(data.updatedAt);
    }
    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Article {article}Loading...</div>;
  }

  return (
    <div className="flex mt-20 justify-center h-full w-full">
      <div className="flex flex-col gap-y-8 w-full text-black my-10 h-full align-middle justify-center items-center">
        <NewsCard
          id={id}
          title={title}
          content={content}
          author={author}
          authorID={authorID}
          category={category}
          tags={tags}
          time={time}
        />
        <Comments id={id} />
      </div>
    </div>
  );
};

export default ArticleDetail;
