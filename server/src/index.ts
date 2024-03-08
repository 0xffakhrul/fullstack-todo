import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getPgVersion } from "./config/db.config";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "./controllers/todo";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

const port = 6969;

app.listen(port, async () => {
  await getPgVersion();
  console.log(`Server listening on port ${port}`);
});

app.post("/todos", async (req, res) => {
  const newTodo = req.body;

  try {
    const result = await createTodo(newTodo);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await getAllTodos();
    res.json(todos);
    console.log(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const todo = await deleteTodo(id);

    if (todo) {
      console.log("Todo deleted successfully");
      res.json({ message: "Todo deleted successfully", deletedTodo: todo });
    } else {
      console.log("Todo not found");
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/todos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const updatedFields = req.body;

  try {
    const updatedTodo = await updateTodo(id, updatedFields);

    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.json(updatedTodo.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
