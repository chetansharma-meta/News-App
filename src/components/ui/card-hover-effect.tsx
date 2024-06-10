"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Article from "@/type/Article";


interface HoverEffectProps {
  items: Article[];
  className?: string;
  categoryFilter: "Politics" | "Sports" | "Tech" | "National" | "all" | "";
  sortCriteria: "" | "date" | "popularity";
  sortOrder: "asc" | "desc";
  searchTags?: string[];
}

export const HoverEffect: React.FC<HoverEffectProps> = ({
  items,
  className,
  categoryFilter,
  sortCriteria,
  sortOrder,
  searchTags,
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  let filteredItems: Article[];

  if (searchTags && searchTags.length > 0 && categoryFilter !== "all") {
    const lowerCaseSearchTags = searchTags.map((tag) => tag.toLowerCase());
    const searchedItems = items.filter(item =>
      item.tags.some(itemTag => lowerCaseSearchTags.includes(itemTag.toLowerCase()))
    );
    filteredItems = searchedItems.filter((item) =>
      categoryFilter ? item.category === categoryFilter : true
    );
    console.log("SEARCHED ITEMS", searchedItems);
  } else {
    if (categoryFilter !== "all") {
      filteredItems = items.filter((item:Article) =>
        categoryFilter ? item.category === categoryFilter : true
      );
    } else {
      filteredItems = items;
    }
  }

  const sortedItems = filteredItems.sort((a, b) => {
    let compare = 0;
    if (sortCriteria === "date") {
      compare =
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    } else if (sortCriteria === "popularity") {
      compare = a.likes.length - b.likes.length;
    }

    return sortOrder === "asc" ? compare : -compare;
  });

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {sortedItems.map((item, idx) => (
        <Link
          href={`/news/${item._id}`}
          key={`news-${item._id}`}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.content}</CardDescription>
            <CardTimestamp>{formatDateTime(item.updatedAt)}</CardTimestamp>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardTimestamp = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-500 tracking-wide leading-relaxed text-xs",
        className
      )}
    >
      {children}
    </p>
  );
};
