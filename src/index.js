import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Hello React Hooks.</h1>
      <h2>1. useState</h2>
      <Count />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
