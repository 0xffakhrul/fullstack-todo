import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { getPgVersion } from "./config/db.config";
import { createTodo, getAllTodos } from "./controllers/todo";

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
