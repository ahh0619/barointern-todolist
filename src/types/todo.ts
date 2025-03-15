export type Todo = {
  id: string;
  title: string;
  date: string;
  completed: boolean;
};

export type TodoClientProps = {
  serverTodos: Todo[];
};

export type TodoItemProps = {
  todo: Todo;
};

export type TodoListProps = {
  todos: Todo[];
};

export type TodoFilterTabsProps = {
  filter: 'ALL' | 'COMPLETED';
  setFilter: (value: 'ALL' | 'COMPLETED') => void;
};

export type TodoStatusProps = {
  remaining: number;
  completed: number;
};

export type UseTodosParams = {
  initialData?: Todo[];
};
