"use client";
import { useState, useEffect } from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import axios from "axios";
import { set } from "mongoose";

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
    setLoading(true);
    setArticles([]);
    fetchArticles();
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="flex justify-between items-center mx-5 pt-10">
        <h1 className="text-3xl font-bold">News</h1>
        <div className="flex gap-2">
          <select className="transition-all delay-50 items-center border border-gray-500 p-2 rounded-md bg-black text-white shadow-none hover:shadow-lg hover:shadow-[#ffffff2d]">
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="title">Popularity</option>
            <option value="category">Criteria</option>
          </select>
          <select className="transition-all delay-50 items-center border border-gray-500 p-2 rounded-md bg-black text-white shadow-none hover:shadow-lg hover:shadow-[#ffffff2d]">
            <option value="">Filter</option>
            <option value="politics">Politics</option>
            <option value="tech">Technology</option>
            <option value="sports">Sports</option>
            <option value="national">National</option>
          </select>
        </div>

        {loading ? (
          <button className="items-end">loading...</button>
        ) : (
          <button
            className=" transition-all delay-50 items-center border border-gray-500 p-2 rounded-md hover:shadow-lg hover:shadow-[#ffffff2d]"
            onClick={refresh}
          >
            Refresh
          </button>
        )}
      </div>

      <HoverEffect items={articles} />
    </div>
  );
}
