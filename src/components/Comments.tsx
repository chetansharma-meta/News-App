import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { formatDateTime } from "@/utils/formatDateTime";
import { FaLocationArrow } from "react-icons/fa";
import api from "@/utils/api";

export function Comments(props: { id: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState("");

  const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("user", session?.user._id);
      formData.append("article", props.id);
      const res = await api.post(`/api/news/${props.id}/comment`, formData);
      const data = res.data;
      if (!data) return;
      setComments([...comments, data]);
      setComment("");
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    async function fetchComments() {
      const res = await api.get(`/api/news/${props.id}/comment`);
      const data = res.data;
      if (!data) return;
      setComments(data);
    }
    fetchComments();
  }, [comment]);

  return (
    <div className="">
      <div className="w-full relative max-w-lg  min-w-[32rem]">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start w-lg">
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            Comments
          </h1>
          {comments.length === 0 ? (
            <div className="text-white mb-4 w-full">No comments</div>
          ) : (
            <div className="w-full relative z-50 mb-4">
              {comments.map((item, index) => (
                <div
                  key={index}
                  className="mb-2 border border-zinc-500 border-opacity-50 bg-slate-800 rounded-lg p-4"
                >
                  <p className="font-semibold text-white">
                    {item.user.firstname + " " + item.user.lastname}
                    <span className="px-2 font-normal text-slate-400">
                      {formatDateTime(item.createdAt)}{" "}
                    </span>
                  </p>
                  <p className="text-slate-300">{item.content}</p>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-row gap-x-2 w-full">
            <input
              type="text"
              placeholder="Type your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2 p-2 w-full h-auto text-wrap rounded-md text-white bg-slate-700 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <button
              className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded border border-blue-500 flex items-center gap-2 justify-center h-full"
              onClick={handleAddComment}
            >
              <span className="font-semibold flex gap-x-1 items-center">
                Send <FaLocationArrow />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
