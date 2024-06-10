"use client";
import { useState, useEffect } from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import { useSearchParams } from "next/navigation";

export function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const searchTags = (searchParams.get("tags") || "")
    .split(",")
    .filter((tag) => tag);
  console.log("TAGS", searchTags);

  const fetchArticles = async () => {
    const res = await fetch("/api/news");
    const data = await res.json();
    if (res.status !== 200) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setArticles(data.articles);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const refresh = async () => {
    setLoading(true);
    setArticles([]);
    await fetchArticles();
    setLoading(false);
  };

  console.log(articles);

  const [categoryFilter, setCategoryFilter] = useState<
    "Politics" | "Sports" | "Tech" | "National" | "all" | ""
  >("");
  const [sortCriteria, setSortCriteria] = useState<"date" | "popularity" | "">(
    ""
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="flex justify-between items-center mx-5 pt-10">
        <h1 className="text-3xl font-bold">
          {searchTags.length ? "Search Results" : "News"}
        </h1>
        <div className="flex gap-2">
          <select
            className="transition-all delay-50 items-center border border-gray-500 p-2 rounded-md bg-black text-white shadow-none hover:shadow-lg hover:shadow-[#ffffff2d]"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value as any)}
            className="transition-all delay-50 items-center border border-gray-500 p-2 rounded-md bg-black text-white shadow-none hover:shadow-lg hover:shadow-[#ffffff2d]"
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="transition-all delay-50 items-center border border-gray-500 p-2 rounded-md bg-black text-white shadow-none hover:shadow-lg hover:shadow-[#ffffff2d]"
          >
            <option value="">Filter</option>
            {searchTags.length && <option value="all">All</option>}
            <option value="Politics">Politics</option>
            <option value="Tech">Technology</option>
            <option value="Sports">Sports</option>
            <option value="National">National</option>
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

      <HoverEffect
        items={articles}
        categoryFilter={categoryFilter}
        sortCriteria={sortCriteria}
        sortOrder={sortOrder}
        searchTags={searchTags}
      />
    </div>
  );
}
