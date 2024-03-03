import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  date: string;
  is_completed: boolean;
}

const useFetchTodos = async () => {
  try {
    const response = await axios.get("http://localhost:6969/todos");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const useUpdateTodo = async (id: number) => {
  const url = `http://localhost:6969/todos/${id}`;
  try {
    const response = await axios.patch(url, {
      is_completed: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const useCreateTodo = async (title: string,
  is_completed = false) => {
    const url = "http://localhost:6969/todos";

    const newTodo = {
      title,
      date: new Date().toISOString(),
      is_completed,
    };

    const response = await axios.post(url, newTodo);
  }

// export async function createTodo(
//   title: string,
//   is_completed = false
// ): Promise<Todo> {
//   // Replace with your actual API endpoint
//   const url = "http://localhost:6969/todos";

//   const newTodo = {
//     title,
//     date: new Date().toISOString(),
//     is_completed,
//   };

//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newTodo),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to create todo: ${response.statusText}`);
//   }

//   return response.json(); 
// }

export { useFetchTodos, useUpdateTodo, useCreateTodo };
