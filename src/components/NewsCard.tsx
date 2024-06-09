import React, { useEffect, useState } from "react";
import { Meteors } from "./ui/meteors";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function NewsCard(props: {
  id: string;
  title: string;
  content: string;
  authorID: string;
  author: string;
  category: string;
  tags: string[];
  time: string;
}) {
  const { data: session } = useSession();
  const route = useRouter();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [authorID, setAuthorID] = useState(props.authorID);

  useEffect(() => {
    async function fetchReaction() {
      if (session) {
        const formData = new FormData();
        formData.append("user", session?.user?._id as string);
        const res = await api.post(
          `/api/news/${props.id}/reaction`,
          formData
        );
        const data = res.data;
        if (!data) return;
        console.log("Data", data);
        if (session && data.type === "like") {
          setLike(true);
        } else if (session && data.type === "dislike") {
          setDislike(true);
        } else {
          setLike(false);
          setDislike(false);
        }
      } else {
        setLike(false);
        setDislike(false);
      } 
    }
    fetchReaction();
  }, []);

  const handleEdit = async () => {
    const { id, title, content, author, authorID, category, tags } = props;
    const tagsString = tags.join(',');
    route.push(`/news/${id}/edit?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}&author=${encodeURIComponent(author)}&authorID=${encodeURIComponent(authorID)}&category=${encodeURIComponent(category)}&tags=${encodeURIComponent(tagsString)}`);
}

  const handleLike = async () => {    
    try {
      if (!session) {
        route.push("/login");
        return;
      }
      setLike(!like);
      if (dislike) setDislike(false);
      const formData = new FormData();
      formData.append("user", session?.user?._id as string);
      await api.post(`/api/news/${props.id}/like`, formData);
    } catch (error) {
      console.error("Error updating like status", error);
    }
  };

  const handleDislike = async () => {
    try {
      if (!session) {
        route.push("/login");
        return;
      }
      setDislike(!dislike);
      if (like) setLike(false);
      const formData = new FormData();
      formData.append("user", session?.user?._id as string);
      await api.post(`/api/news/${props.id}/dislike`, formData);
    } catch (error) {
      console.error("Error updating dislike status", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!session) {
        route.push("/login");
        return;
      }
      await api.delete(`/api/news/${props.id}`);
      route.push("/news");
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="">
      <div className="w-full relative max-w-lg min-w-[32rem]">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <h1 className="font-bold text-2xl text-white mb-2 relative z-50">
            {props.title}
          </h1> 
          <p className="font-normal text-lg text-slate-400 my-4 relative z-50">
            {props.content}
          </p>
          <p className="font-normal text-sm text-slate-300 relative z-50 pt-2">
            Author: {props.author}
          </p>
          
          <p className="font-normal text-sm text-slate-300 relative z-50 py-1">
            Category: {props.category}
          </p>

          <p className="font-normal text-sm text-slate-300 relative z-50 pb-4">
            Uploaded on: {formatDateTime(props.time)} 
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
            {session?.user?._id === authorID && (
              <div className="flex justify-end items-end w-full gap-2">
                <button
                  onClick={handleDelete}
                  className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300"
                >
                  Delete
                </button>
                <button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
