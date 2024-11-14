'use client';

import { useState } from 'react';
import { SeekFormData } from '@/types/seek';

export default function CreateSeek({
  onSubmit,
}: {
  onSubmit: (data: SeekFormData) => void;
}) {
  const [formData, setFormData] = useState<SeekFormData>({
    name: '',
    email: '',
    content: '',
    tags: [],
  });
  const [currentTag, setCurrentTag] = useState('');

  const handleAddTag = () => {
    if (currentTag && formData.tags.length < 15 && currentTag.length <= 25) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag],
      });
      setCurrentTag('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', content: '', tags: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 bg-[#0a0a0a] border border-[#333] rounded text-amber-400 font-mono placeholder-gray-600"
          maxLength={50}
          required
        />
        <input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="p-2 bg-[#0a0a0a] border border-[#333] rounded text-amber-400 font-mono placeholder-gray-600"
          required
        />
      </div>
      
      <textarea
        placeholder="What's on your mind? (max 200 characters)"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full p-2 bg-[#0a0a0a] border border-[#333] rounded text-gray-300 font-mono placeholder-gray-600"
        maxLength={200}
        required
      />
      
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add tag"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          className="flex-1 p-2 bg-[#0a0a0a] border border-[#333] rounded text-blue-400 font-mono placeholder-gray-600"
          maxLength={25}
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-[#2a2a2a] text-amber-400 rounded font-mono hover:bg-[#333] border border-[#444]"
        >
          Add Tag
        </button>
      </div>
      
      <button
        type="submit"
        className="w-full bg-[#2a2a2a] text-amber-400 py-2 rounded font-mono hover:bg-[#333] border border-[#444]"
      >
        Post
      </button>
    </form>
  );
}