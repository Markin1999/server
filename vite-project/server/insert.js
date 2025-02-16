import db from "./db.js";

db.exec(
  `INSERT INTO planets (nome)
    VALUES ("Earth"),
    ("Mars")`
);
