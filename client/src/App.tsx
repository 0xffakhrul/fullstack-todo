import { useState } from "react";
import Input from "./components/Input";
import List, { Task } from "./components/List";
import Header from "./components/Header";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (
    id: number,
    title: string,
    date: string,
    is_completed: boolean
  ) => {
    const newTask = { id, title, date, is_completed };
    setTasks([...tasks, newTask]);
    console.log(newTask);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-6">
      <Header tasks={tasks} />
      <List />
      <Input onAddTask={handleAddTask} />
    </div>
  );
}
