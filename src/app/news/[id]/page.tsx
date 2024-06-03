'use client';

import { UploadDemo } from '@/components/UploadDemo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NewsCard } from '@/components/NewsCard';

const ArticleDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [author, setAuthor] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetch(`/api/news/${id}`);
      const data = await res.json();
      setArticle(data);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setTags(data.tags);
      setAuthor(data.author);
    }
    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Article {article}Loading...</div>;
  }

  return (
    <div className="flex mt-20 justify-center h-full w-full">
    <div className="flex w-full text-black my-20 h-full align-middle justify-center items-center">

    <NewsCard id={id} title={title} content={content} author={author}/>

      {/* {editMode ? (
        <UploadDemo id={id} title={title} content={content} category={category} tags={tags}/>
      ) : (
        
      )} */}

    </div>
  </div>
  );
};

export default ArticleDetail;
