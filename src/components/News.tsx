"use client";
import { useState, useEffect } from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import axios from "axios";

export function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    const res = await axios.get("/api/news");
    const data = await res.data;
    if (res.status !== 200) {
      setError(data.message);
      setLoading(false);  
      return;
    }
    console.log(data.articles);
    setArticles(data.articles);
    setLoading(false);

  };
  useEffect(() => {
    fetchArticles();
  }, []);

  const refresh = () => {
    fetchArticles();
  };

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="flex justify-between items-center mx-5 pt-10">
        <h1 className="text-3xl font-bold">News</h1>
        {loading ? (
          <button className="items-end" onClick={refresh}>
          loading...
        </button>
        ): (
          <button className="items-end" onClick={refresh}>
          Refresh
        </button>
        )}
      </div>

      <HoverEffect items={articles} />
    </div>
  );
}