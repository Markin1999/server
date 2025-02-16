import { useState } from "react";

export default function AggiungiPianeta() {
  const [pianeta, setPianeta] = useState({ nome: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPianeta({ [name]: value });
  };

  async function fetchPianeta() {
    try {
      const response = await fetch("http://localhost:3000/aggiungi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pianeta),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      setPianeta("");
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = () => {
    fetchPianeta();
    aggiornaPianeti();
  };

  return (
    <div>
      <label htmlFor="aggiungi">Aggiungi pianeta</label>
      <input
        type="text"
        id="aggiungi"
        name="nome"
        value={pianeta.nome}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick}>
        Aggiungi
      </button>
    </div>
  );
}
