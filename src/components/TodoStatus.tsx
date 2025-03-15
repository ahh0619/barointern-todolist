import { FC } from 'react';

import { TodoStatusProps } from '@/types/todo';

const TodoStatus: FC<TodoStatusProps> = ({ remaining, completed }) => {
  return (
    <div className="mb-4">
      <p className="mb-1 text-sm text-gray-600">
        남은 할 일: <span className="font-semibold">{remaining}</span>
      </p>
      <p className="text-sm text-gray-600">
        완료된 일: <span className="font-semibold">{completed}</span>
      </p>
    </div>
  );
};

export default TodoStatus;
