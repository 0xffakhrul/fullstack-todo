//todo.ts
import { QueryResult } from "pg";
import { pool } from "../config/db.config";

interface Todo {
  id: number;
  title: string;
  date: Date;
  is_completed: boolean;
}

const getAllTodos = async (): Promise<Todo[]> => {
  const query = "SELECT * FROM todo";

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error getting todos:", error.message);
    throw error;
  }
};

const createTodo = async (newTodo: Todo): Promise<QueryResult> => {
  const { title, is_completed } = newTodo;
  const query =
    "INSERT INTO todo (title, is_completed, date) VALUES ($1, $2, COALESCE($3, CURRENT_TIMESTAMP)) RETURNING *";
  const values = [title, is_completed, newTodo.date];

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error("Error creating todo:", error.message);
    throw error;
  }
};

export { getAllTodos, createTodo };
