import { Pool } from "pg";
require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

async function getPgVersion() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM todo");
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

export { pool, getPgVersion };
