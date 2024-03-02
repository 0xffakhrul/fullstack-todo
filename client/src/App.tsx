import { useState } from "react";
import Input from "./components/Input";
import List from "./components/List";
import Header from "./components/Header";
import {
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createTodo } from "./hooks/useTodo";
import { Todo } from "./utils/types";

export default function App() {
  const queryClient = useQueryClient();
  const createTodoMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      const newTodo = await createTodo(todo.title);
      return newTodo;
    },
    onSuccess: (newTodo) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("Added todo:", newTodo);
    },
  });

  const handleAddTodo = (todo: Todo) => {
    createTodoMutation.mutate(todo);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-4xl mx-auto my-8 px-6">
        <Header />
        <List />
        <Input onAddTask={handleAddTodo} />
      </div>
    </QueryClientProvider>
  );
}
