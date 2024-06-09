"use client";
import { useEffect } from "react";
import { CardStack } from "./ui/card-stack";
import { cn } from "@/utils/cn";
import axios from "axios";
import { useState } from "react";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: string;
};

export function Hero() {
  const [articles, setArticles] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const res = await axios.get("/api/news");
      const data = res.data;
      if (res.status !== 200) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setArticles(
        data.articles.reverse().slice(0, 4).map((article: any,index:number) => ({
          id: index+1,
          name: article.author.firstname + " " + article.author.lastname,
          designation: article.title,
          content: article.content,
        }))
      );
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="h-[20rem] flex items-center justify-center w-full">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <CardStack items={articles} />
      )}
    </div>
  );
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

