import { CheckSquare, List } from 'lucide-react';
import { FC } from 'react';

import { TodoFilterTabsProps } from '@/types/todo';

const TodoFilterTabs: FC<TodoFilterTabsProps> = ({ filter, setFilter }) => {
  return (
    <div className="mb-4 flex justify-center gap-2">
      <button
        onClick={() => setFilter('ALL')}
        className={`rounded-lg px-3 py-2 ${
          filter === 'ALL'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
        }`}
      >
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
  );
};

export default TodoFilterTabs;
