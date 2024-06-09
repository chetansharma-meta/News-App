"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Searchbar() {
  const route = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const placeholders = [
    "Search for tags... ",
    "IOS, Android, AI, VR, Blockchain, Cybersecurity",
    "Election, Policy, Government, Debate, Law, Diplomacy",
    "Football, Basketball, Baseball, Tennis, Cricket",
    "Economy, Education, Health, Infrastructure, Environment",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(",").map(tag => tag.trim()));
    console.log(tags);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    route.push(`/news?tags=${tags.join(",")}`); 
    console.log("submitted");
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Search For Any News
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
