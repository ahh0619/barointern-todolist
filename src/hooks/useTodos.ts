import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTodo, deleteTodo, fetchTodos, updateTodo } from '@/lib/api';
import { Todo } from '@/types/todo';

type UseTodosParams = {
  initialData?: Todo[];
};

export const useTodos = ({ initialData }: UseTodosParams = {}) => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
    initialData,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTodo(id, { completed }),
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo,
        ),
      );
      return { previousTodos };
    },
    onError: (err, variables, context: any) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    isError,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
