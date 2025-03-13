'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

import { createTodo, deleteTodo, fetchTodos, updateTodo } from '@/lib/api';
import { Todo } from '@/types/todo';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const createMutation = useMutation<Todo, unknown, string>({
    mutationFn: (newTitle: string) => createTodo(newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
    },
  });

  const updateMutation = useMutation<
    Todo,
    unknown,
    { id: string; completed: boolean }
  >({
    mutationFn: ({ id, completed }) => updateTodo(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation<void, unknown, string>({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleAdd = () => {
    if (!title.trim()) return;
    createMutation.mutate(title);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <div className="mx-auto w-full max-w-md rounded-lg p-6">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">오늘 할 일</h1>

        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            className="flex-1 border-b-2 border-gray-300 py-1 placeholder-gray-400 focus:border-black focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAdd}
            className="ml-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F4F4F] text-white hover:bg-black focus:bg-black focus:outline-none"
          >
            <Plus size={20} />
          </button>
        </div>

        <p className="mb-1 text-sm text-gray-600">
          남은 할 일:{' '}
          <span className="font-semibold">
            {todos.filter((t) => !t.completed).length}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          완료된 일:{' '}
          <span className="font-semibold">
            {todos.filter((t) => t.completed).length}
          </span>
        </p>

        <ul className="mt-4 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-start justify-between rounded-lg border border-gray-300 p-3"
            >
              <div className="flex w-full flex-col pr-2">
                <div className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                      updateMutation.mutate({
                        id: todo.id,
                        completed: !todo.completed,
                      })
                    }
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
                onClick={() => deleteMutation.mutate(todo.id)}
                className="mt-1 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default HomePage;
