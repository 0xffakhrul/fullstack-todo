import axios from "axios";
import { FC, useState } from "react";

interface InputProps {
  onAddTask: (
    id: number,
    title: string,
    date: string,
    is_completed: boolean
  ) => void;
}

const Input: FC<InputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    if (title.trim() !== "" && formattedDate.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:6969/todos", {
          title,
          date: formattedDate,
          is_completed: false,
        });

        const newTask = response.data;
        onAddTask(
          newTask.id,
          newTask.title,
          newTask.date,
          newTask.is_completed
        );
        setTitle("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input rounded-xl bg-neutral w-full"
          placeholder="Add Task"
        />
        <button
          type="submit"
          className="btn btn-secondary text-xl rounded-xl font-bold"
        >
          +
        </button>
      </form>
    </div>
  );
};

export default Input;
