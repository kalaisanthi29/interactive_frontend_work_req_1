import { useEffect, useState } from "react";
import "./App.css";

type FunFact = {
  text: string;
};

function App() {
  const [funFacts, setFunFacts] = useState<FunFact[]>([]);
  const [currentFact, setCurrentFact] = useState("");

  useEffect(() => {
    fetch("/funfacts.json")
      .then((response) => response.json())
      .then((data) => {
        setFunFacts(data.funFacts);

        if (data.funFacts.length > 0) {
          setCurrentFact(data.funFacts[0].text);
        }
      });
  }, []);

  useEffect(() => {
    if (funFacts.length === 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      setCurrentFact(funFacts[randomIndex].text);
    }, 2000);

    return () => clearInterval(interval);
  }, [funFacts]);

  return (
    <main>
      <h1>Hi, I'm Shanti 👋</h1>
      <h2>Random fact about me</h2>
      <p>{currentFact}</p>
    </main>
  );
}

export default App;