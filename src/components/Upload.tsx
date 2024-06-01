"use client"
import React, { useState } from 'react';

const categories = ['World', 'Business', 'Technology', 'Sports', 'Health'];
const tags = ['Breaking News', 'Featured', 'Trending', 'Top Story'];

const Upload: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedTags(selectedOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ title, content, category, selectedTags });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 bg-[#2a2a2a] shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Upload News</h2   >
      
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
          required
        ></textarea>
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 font-semibold mb-2">Tags</label>
        <select
          id="tags"
          multiple
          value={selectedTags}
          onChange={handleTagChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default Upload;
