import { FC, useState } from "react";

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

    const newTodo = {
      title,
      date: new Date().toISOString(), // Set current date as ISO string
      is_completed: false, 
    };
    onAddTask(newTodo);

    console.log(newTodo); // Log the new todo object
    setTitle(""); 
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
