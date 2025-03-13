'use client';

import { FC } from 'react';

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

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        리스트를 가져오는 중 에러가 발생했습니다: {(error as Error).message}
      </div>
    );

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div className="mx-auto w-full max-w-md rounded-lg p-6 sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">오늘 할 일</h1>

      {/* 새 할 일 */}
      <TodoInput />

      {/* 남은/완료된 일 표시 */}
      <p className="mb-1 text-sm text-gray-600">
        남은 할 일: <span className="font-semibold">{remaining}</span>
      </p>
      <p className="text-sm text-gray-600">
        완료된 일: <span className="font-semibold">{completed}</span>
      </p>

      {/* 투두 목록 */}
      <TodoList todos={todos} />
    </div>
  );
};

export default TodoClient;
