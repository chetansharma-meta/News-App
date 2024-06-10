import api from "@/utils/api";

export const fetchArticles = async () => {
  const res = await api.get("/api/news");
  const data = res.data;
  if (!data) return;
  return data.articles;
};
