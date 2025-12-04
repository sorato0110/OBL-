import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface GoalInputProps {
  onAdd: (text: string) => void;
}

export const GoalInput: React.FC<GoalInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="例：英語をマスターする、体重を5kg落とす、副業を始める..."
        className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder-gray-400"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">追加する</span>
      </button>
    </form>
  );
};