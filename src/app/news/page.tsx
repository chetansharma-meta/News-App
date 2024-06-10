import React, { Suspense } from "react";
import NewsClient from "@/components/News";
import Article from "@/type/Article";

async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.VERCEL_URL}/api/news`);
  const data = await res.json();
  return data.articles;
}

const NewsPage = async () => {
  const initialArticles = await fetchArticles();

  return (
    <div className="m-12">
      <Suspense fallback={<div>Loading...</div>}>
        <NewsClient initialArticles={initialArticles} />
      </Suspense>
    </div>
  );
};

export default NewsPage;
