"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import axios from "axios";

type Card = {
  id: number;
  content: string;
  name: string;
  title: string;
};

export function InfiniteNews() {
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
      console.log(data.articles);
      setArticles(
        data.articles.map((article: any, index: number) => ({
          id: index + 1,
          name: article.author.firstname + " " + article.author.lastname,
          title: article.title,
          content: article.content,
        }))
      );
      setLoading(false);
    };
    fetchArticles();
  }, []);
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={articles}
        direction="right"
        speed="fast"
      />
    </div>
  );
}
