import { FC } from "react";
import { useFetchTodos } from "../hooks/useTodo";
import { useQuery } from "@tanstack/react-query";

interface HeaderProps {
  
}

const Header: FC<HeaderProps> = ({}) => {
  const {
    isLoading,
    data: todos,
    error,
  } = useQuery({ queryKey: ["todos"], queryFn: useFetchTodos });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(todos);

  const openTasks = todos.filter((todo: any) => !todo.is_completed);

  console.log(openTasks);

  return (
    <div className="pb-4">
      <h1 className="font-bold text-3xl pb-4 text-secondary">
        You have {openTasks.length} open tasks.
      </h1>
    </div>
  );
};

export default Header;
