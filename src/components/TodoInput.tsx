'use client';

import { Plus } from 'lucide-react';
import { FC, useState } from 'react';

import { useTodos } from '@/hooks/useTodos';

export const TodoInput: FC = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { createMutation } = useTodos();

  const handleAdd = () => {
    if (!title.trim()) {
      setError('할 일을 입력해주세요.');
      return;
    }
    setError('');
    createMutation.mutate(title);
    setTitle('');
  };

  return (
    <div className="mb-4 flex flex-col">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="flex-1 border-b-2 border-gray-300 py-1 placeholder-gray-400 focus:border-black focus:outline-none"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="ml-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F4F4F] text-white hover:bg-black focus:bg-black focus:outline-none"
        >
          <Plus size={20} />
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
