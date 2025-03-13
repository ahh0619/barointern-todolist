import TodoClient from '@/components/TodoClient';
import { fetchTodos } from '@/lib/api';
import { Todo } from '@/types/todo';

const HomePage = async () => {
  const todos: Todo[] = await fetchTodos();

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white px-4">
      <TodoClient serverTodos={todos} />
    </main>
  );
};

export default HomePage;
