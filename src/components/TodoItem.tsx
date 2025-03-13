'use client';

import { X } from 'lucide-react';
import { FC } from 'react';

import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const { updateMutation, deleteMutation } = useTodos();

  const handleToggle = () => {
    updateMutation.mutate({ id: todo.id, completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteMutation.mutate(todo.id);
  };

  return (
    <li className="flex items-start justify-between rounded-lg border border-gray-300 p-3">
      <div className="flex w-full flex-col pr-2">
        <div className="mb-1 flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="mr-2 h-5 w-5 cursor-pointer accent-blue-600"
          />
          <span
            className={`break-all ${
              todo.completed ? 'text-gray-500 line-through' : ''
            }`}
          >
            {todo.title}
          </span>
        </div>
        <span className="ml-7 break-all text-sm text-gray-400">
          {todo.date}
        </span>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        className="mt-1 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>
    </li>
  );
};
