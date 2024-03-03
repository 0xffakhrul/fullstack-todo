import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useUpdateTodo, useFetchTodos } from "../hooks/useTodo";
import { Todo } from "../utils/types";

interface ListProps {}

const List: FC<ListProps> = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: todos,
    error,
  } = useQuery({ queryKey: ["todos"], queryFn: useFetchTodos });

  console.log("Todos:", todos);


  const updateTodoMutation = useMutation({
    mutationFn: useUpdateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("succ");
    },
  });

  const handleMarkAsDone = async (id: number) => {
    // Call the mutation to mark the task as done
    await updateTodoMutation.mutateAsync(id);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(todos);

  const filteredTask = Array.isArray(todos)
    ? todos.filter((todo: any) => {
        if (selectedTab === "all") {
          return true;
        } else if (selectedTab === "pending") {
          return !todo.is_completed;
        } else if (selectedTab === "completed") {
          return todo.is_completed;
        }
        return false;
      })
    : [];

  return (
    <div className="space-y-3 mb-3">
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab ${selectedTab === "all" ? "tab-active" : ""}`}
          onClick={() => setSelectedTab("all")}
        >
          All
        </a>
        <a
          role="tab"
          className={`tab ${selectedTab === "pending" ? "tab-active" : ""}`}
          onClick={() => setSelectedTab("pending")}
        >
          Pending
        </a>
        <a
          role="tab"
          className={`tab ${selectedTab === "completed" ? "tab-active" : ""}`}
          onClick={() => setSelectedTab("completed")}
        >
          Completed
        </a>
      </div>
      <div className="space-y-3 mb-3">
        {filteredTask.map((todo: any) => (
          <div className="bg-base-200 rounded-xl px-4 py-5 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
            <div className="space-y-1">
              <p className="text-secondary">{todo.title}</p>
              <p className="text-zinc-500">{todo.date}</p>
              <p
                className={`badge ${
                  todo.is_completed ? "badge-success" : "badge-secondary"
                }  badge-outline rounded-md`}
              >
                {todo.is_completed ? "Completed" : "Pending"}
              </p>
            </div>
            <div className="space-y-1 space-x-4">
              {todo.is_completed ? (
                ""
              ) : (
                <button
                  className="btn btn-success font-bold text-base rounded-xl h-8 min-h-6"
                  onClick={() => handleMarkAsDone(todo.id)}
                >
                  Done
                </button>
              )}
              <button className="btn btn-accent font-bold text-base rounded-xl h-8 min-h-6">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
