import { FC } from 'react';

import { TodoListProps } from '@/types/todo';

import TodoItem from './TodoItem';

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <ul className="mt-4 space-y-3">
      {todos
        .slice()
        .reverse()
        .map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
    </ul>
  );
};

export default TodoList;
