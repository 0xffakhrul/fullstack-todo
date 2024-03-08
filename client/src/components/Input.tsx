import { FC, useState } from "react";
import toast from "react-hot-toast";

interface InputProps {
  onAddTask: any;
}

const Input: FC<InputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    try {
      const newTodo = {
        title,
        date: new Date().toISOString(),
        is_completed: false,
      };
      onAddTask(newTodo);
      toast.success("Todo added!", {
        style: {
          backgroundColor: "#17a24a",
          color: "white",
          fontWeight: "bold",
        },
        iconTheme: {
          primary: "#FFFAEE",
          secondary: "#17a24a",
        },
      });
      console.log(newTodo);
      setTitle("");
    } catch (error) {
      toast.error("Fail to add todo.", {
        style: {
          backgroundColor: "#ee524a",
          color: "white",
          fontWeight: "bold",
        },
        iconTheme: {
          primary: "#FFFAEE",
          secondary: "#ee524a",
        },
      });
    }
  };

  return (
    <div className="mb-8">
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
