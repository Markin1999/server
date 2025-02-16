import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./Database.db");

db.exec(
  `
    CREATE TABLE IF NOT EXISTS planets(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(50) NOT NULL
    )
    `,
  (error) => {
    if (error) {
      console.error("errore");
    }
  }
);

export default db;
