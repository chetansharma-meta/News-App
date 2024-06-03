import React, { useState } from "react";
import { Meteors } from "./ui/meteors";
import axios from "axios";
import { useRouter } from "next/navigation";

export function NewsCard(props: {
  id: string;
  title: string;
  content: string;
  author: string;
}) {
    const route = useRouter();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLike = async () => {
    try {
      setLike(!like);
      if (dislike) setDislike(false);
      await axios.post(`/api/articles/${props.id}/like`, { like: !like });
    } catch (error) {
      console.error("Error updating like status", error);
    }
  };

  const handleDislike = async () => {
    try {
      setDislike(!dislike);
      if (like) setLike(false);
      await axios.post(`/api/articles/${props.id}/dislike`, {
        dislike: !dislike,
      });
    } catch (error) {
      console.error("Error updating dislike status", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/news/${props.id}`);
        route.push("/news");
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  return (
    <div className="">
      <div className="w-full relative max-w-lg">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            {props.title}
          </h1>
          <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
            {props.content}
          </p>
          <p className="font-normal text-base text-slate-500 relative z-50 ">
            {props.author}
          </p>
          <div className="flex justify-between items-center w-full py-2">
            <div className="flex gap-2 items-center text-white">
              <button
                className={`border px-4 py-1 rounded-full flex items-center gap-2 ${
                  like
                    ? "border-blue-500 text-blue-500 bg-blue-500 bg-opacity-10"
                    : "border-gray-500 text-gray-300"
                }`}
                onClick={handleLike}
              >
                <img src="/like.svg" alt="Like" className="w-5 h-5" />
                <span className="pr-4">Like</span>
              </button>
              <button
                className={`border px-4 py-1 rounded-full flex items-center gap-2 ${
                  dislike
                    ? "border-red-500 text-red-500 bg-red-500 bg-opacity-10"
                    : "border-gray-500 text-gray-300"
                }`}
                onClick={handleDislike}
              >
                <img src="/dislike.svg" alt="Dislike" className="w-5 h-5" />
                <span className="pr-4">Dislike</span>
              </button>
            </div>
            <div className="flex justify-end items-end w-full gap-2">
              <button
              onClick={handleDelete}
              className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">
                Delete
              </button>
              <button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">
                Edit
              </button>
            </div>
          </div>
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
