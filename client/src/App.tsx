import Input from "./components/Input";
import List from "./components/List";
import Header from "./components/Header";
import {
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCreateTodo } from "./hooks/useTodo";
import { Todo } from "./utils/types";
import { Toaster } from "react-hot-toast";

export default function App() {
  const queryClient = useQueryClient();
  const createTodoMutation = useMutation({
    mutationFn: async (todo: Todo) => {
      const newTodo = await useCreateTodo(todo.title);
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
      <div className="max-w-4xl mx-auto my-10 px-6">
        <Toaster />
        <Header />
        <List />
        <Input onAddTask={handleAddTodo} />
      </div>
    </QueryClientProvider>
  );
}
