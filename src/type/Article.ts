interface Article {
  title: string;
  content: string;
  _id: string;
  updatedAt: string;
  category: string;
  tags: string[];
  likes: number[];
  dislikes: number;
  comments: string[];
}

export default Article;