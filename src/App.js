import React, { useState } from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";

function App() {
  const [start, setStart] = useState(false);

  function startQuiz() {
    setStart((prevState) => !prevState);
  }

  return (
    <div>
      <Navbar />
      {!start ? <Start startQuiz={startQuiz} /> : <Quiz />}
    </div>
  );
}

export default App;
