"use client";
import React, { useState } from "react";
import { Meteors } from "./ui/meteors";

type Category = "Politics" | "Sports" | "Tech" | "National";

const categories: Record<Category, string[]> = {
  Politics: [
    "Election",
    "Policy",
    "Government",
    "Debate",
    "Law",
    "Diplomacy",
    "Scandal",
    "Legislation",
    "Campaign",
    "Senate",
    "Others"
  ],
  Sports: [
    "Football",
    "Basketball",
    "Baseball",
    "Tennis",
    "Cricket",
    "Hockey",
    "Golf",
    "Swimming",
    "Athletics",
    "Cycling",
    "Others"
  ],
  Tech: [
    "Phone",
    "Laptop",
    "iOS",
    "Android",
    "Gadgets",
    "AI",
    "VR",
    "Blockchain",
    "Cybersecurity",
    "Software",
    "Others"
  ],
  National: [
    "Economy",
    "Education",
    "Health",
    "Infrastructure",
    "Environment",
    "Culture",
    "Defense",
    "Labor",
    "Agriculture",
    "Transport",
    "Others"
  ],
};

export function UploadDemo() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    tag: string
  ) => {
    e.preventDefault();
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, content, category, selectedTags });
  };

  return (
    <div className="content-box">
      <div className="h-full w-full relative max-w-full">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[1] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-start items-start">
          <h1 className="font-bold text-xl text-white mb-4 relative z-50">
            Upload News
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Title"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full min-h-[3rem] resize-none overflow-hidden"
              style={{ height: "auto", minHeight: "3rem" }}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              required
            ></textarea>

            <div className="p-4 bg-gray-800 rounded-lg max-w-md ">
              <select
                className="bg-gray-900 text-white px-4 py-2 rounded-lg w-full my-1"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as Category);
                  setSelectedTags([]);
                }}
                required
              >
                <option value="">Select a category</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {((category && categories[category]) || []).map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => handleTagToggle(e, tag)}
                    className={`px-4 py-2 rounded-lg ${
                      selectedTags.includes(tag)
                        ? "bg-cyan-400 text-white"
                        : "bg-gray-700 text-gray-300"
                    } transition duration-300`}
                  >
                    {tag}
                  </button>
                ))}
                  </div>
            </div>

            <button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">
              Upload
            </button>
          </form>

          {/* Meaty part - Meteor effect */}
          <Meteors number={25} />
        </div>
      </div>
    </div>
  );
}
