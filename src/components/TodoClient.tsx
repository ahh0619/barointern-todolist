'use client';

import { CheckSquare, List } from 'lucide-react';
import { FC, useState } from 'react';

import Loading from '@/components/Loading';
import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types/todo';

import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

type TodoClientProps = {
  serverTodos: Todo[];
};

const TodoClient: FC<TodoClientProps> = ({ serverTodos }) => {
  const { todos, isLoading, isError, error } = useTodos({
    initialData: serverTodos,
  });

  const [filter, setFilter] = useState<'ALL' | 'COMPLETED'>('ALL');

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        리스트를 가져오는 중 에러가 발생했습니다: {(error as Error).message}
      </div>
    );

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  const filteredTodos =
    filter === 'ALL' ? todos : todos.filter((todo) => todo.completed);

  return (
    <div className="mx-auto w-full max-w-md rounded-lg p-6 sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">오늘 할 일</h1>

      {/* 새 할 일 입력 */}
      <TodoInput />

      {/* 남은/완료된 일 개수 표시 */}
      <p className="mb-1 text-sm text-gray-600">
        남은 할 일: <span className="font-semibold">{remaining}</span>
      </p>
      <p className="mb-4 text-sm text-gray-600">
        완료된 일: <span className="font-semibold">{completed}</span>
      </p>

      {/* 탭 */}
      <div className="mb-4 flex justify-center gap-4">
        <button
          onClick={() => setFilter('ALL')}
          className={`rounded-lg px-3 py-2 ${
            filter === 'ALL'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
          }`}
        >
          {/* 데스크탑에서는 텍스트, 모바일에서는 아이콘 */}
          <span className="hidden sm:inline">모든 할 일</span>
          <span className="sm:hidden">
            <List size={20} />
          </span>
        </button>
        <button
          onClick={() => setFilter('COMPLETED')}
          className={`rounded-lg px-3 py-2 ${
            filter === 'COMPLETED'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
          }`}
        >
          <span className="hidden sm:inline">완료된 일</span>
          <span className="sm:hidden">
            <CheckSquare size={20} />
          </span>
        </button>
      </div>

      {/* 할 일 목록 */}
      <TodoList todos={filteredTodos} />
    </div>
  );
};

export default TodoClient;
