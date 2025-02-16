import { useEffect, useState } from "react";

export default function Pianeti() {
  const [pianeti, setPianeti] = useState(null);

  async function fetchPianeti() {
    try {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();

      setPianeti(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPianeti();
  }, []);

  return (
    <div>
      {pianeti ? (
        pianeti.map((c) => (
          <div key={c.id}>
            <p>{c.id}</p>
            <p>{c.nome}</p>
          </div>
        ))
      ) : (
        <p>Pianeti vuoti</p>
      )}
    </div>
  );
}
