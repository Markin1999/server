import express, { json } from "express";
import db from "./db.js";

const app = express();
const PORT = 3000;

app.use(json());

app.get("/", (req, res) => {
  db.all(`SELECT * FROM planets`, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`server in ascolto su http://localhost:${PORT}`);
});
