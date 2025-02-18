import express, { json } from "express";
import cors from "cors";
import db from "./db.js";
import Joi from "joi";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const planetSchema = Joi.object({
  name: Joi.string().min(2).required(),
});

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

// Ottenere un pianeta per ID
app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM planets WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Pianeta non trovato" });
    }
    res.status(200).json(row);
  });
});

// Aggiornare un pianeta per ID
app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  db.run(
    "UPDATE planets SET name = ? WHERE id = ?",
    [value.name, id],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Errore durante l'aggiornamento" });
      }

      res.status(200).json({ msg: "Pianeta aggiornato con successo" });
    }
  );
});

// Eliminare un pianeta per ID
app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM planets WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Errore durante l'eliminazione" });
    }

    res.status(200).json({ msg: "Pianeta eliminato con successo" });
  });
});

app.listen(PORT, () => {
  console.log(`server in ascolto su http://localhost:${PORT}`);
});
