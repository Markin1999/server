import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Pianeti from "./Componenti/pianeti";
import AggiungiPianeta from "./Componenti/aggiungiPianeta";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Pianeti />
      <AggiungiPianeta />
    </>
  );
}

export default App;
