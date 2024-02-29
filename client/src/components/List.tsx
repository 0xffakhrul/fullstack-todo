import axios from "axios";
import { FC, useEffect, useState } from "react";

export interface Task {
  id: number;
  title: string;
  date: string;
  is_completed: boolean;
}

interface ListProps {
  // tasks: Task[];
}

const List: FC<ListProps> = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:6969/todos");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleMarkAsDone = async (id: number) => {
    try {
      await axios.patch(`http://localhost:6969/todos/${id}`, {
        is_completed: true,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, is_completed: true } : task
        )
      );
    } catch (error) {
      console.error("error updating", error);
    }
  };

  const filteredTask = tasks.filter((task) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "pending") {
      return !task.is_completed;
    } else if (selectedTab === "completed") {
      return task.is_completed;
    }
    return false;
  });

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
        {filteredTask.map((task) => (
          <div className="bg-base-200 rounded-xl px-4 py-5 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
            <div className="space-y-1">
              <p className="text-secondary">{task.title}</p>
              <p className="text-zinc-500">{task.date}</p>
              <p
                className={`badge ${
                  task.is_completed ? "badge-success" : "badge-secondary"
                }  badge-outline rounded-md`}
              >
                {task.is_completed ? "Completed" : "Pending"}
              </p>
            </div>
            <div className="space-y-1 space-x-4">
              <button
                onClick={() => handleMarkAsDone(task.id)}
                className="btn btn-success font-bold text-base rounded-xl h-8 min-h-6"
              >
                Done
              </button>
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
