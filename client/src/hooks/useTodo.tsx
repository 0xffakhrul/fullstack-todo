import axios from "axios";

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

const useDeleteTodo = async (id: number) => {
  const url = `http://localhost:6969/todos/${id}`;

  try {
    const response = await axios.delete(url);
    console.log("Todo deleted successfully", response.data);
  } catch (error) {
    console.error(error);
  }
};

const useCreateTodo = async (title: string, is_completed = false) => {
  const url = "http://localhost:6969/todos";

  const newTodo = {
    title,
    date: new Date().toISOString(),
    is_completed,
  };

  try {
    const response = await axios.post(url, newTodo);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { useDeleteTodo, useFetchTodos, useUpdateTodo, useCreateTodo };
