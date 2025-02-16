import express, { json } from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.all(`SELECT * FROM planets`, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(rows);
  });
});

app.post("/aggiungi", (req, res) => {
  const { nome } = req.body;

  db.run(
    `INSERT INTO planets (nome) VALUES (?)
    `,
    [nome],
    function (err) {
      if (err) {
        return res.status(500).json({ error: "Errore" });
      }

      res.status(201).json({ message: "Pianeta aggiunto", id: this.lastID });
    }
  );
});

app.listen(PORT, () => {
  console.log(`server in ascolto su http://localhost:${PORT}`);
});
