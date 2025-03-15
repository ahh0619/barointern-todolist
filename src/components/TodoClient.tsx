'use client';

import { FC, useState } from 'react';

import Loading from '@/components/Loading';
import { TodoFilterTabs } from '@/components/TodoFilterTabs';
import { TodoStatus } from '@/components/TodoStatus';
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

      {/* 할 일 상태 표시 */}
      <TodoStatus remaining={remaining} completed={completed} />

      {/* 필터 탭 */}
      <TodoFilterTabs filter={filter} setFilter={setFilter} />

      {/* 할 일 목록 */}
      <TodoList todos={filteredTodos} />
    </div>
  );
};

export default TodoClient;
