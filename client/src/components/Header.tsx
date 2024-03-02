import { FC, useEffect, useState } from "react";
import { todoCount } from "../hooks/useTodo";
import { useQuery } from "@tanstack/react-query";

interface HeaderProps {
  // tasks: Task[];
}

const Header: FC<HeaderProps> = ({}) => {
  // const {
  //   isLoading,
  //   data: todos,
  //   error,
  // } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: todoCount,
  // });

  // console.log(todos);

  // if (isLoading) return "Loading...";
  // if (error) return "An error has occurred: " + error.message;

  return (
    <div className="pb-4">
      <h1 className="font-bold text-3xl pb-4 text-secondary">
        You have sdsfd
      </h1>
    </div>
  );
};

export default Header;
