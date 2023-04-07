import { useState } from "react";
import { flushSync } from "react-dom";

export default function App() {
  console.log("Component render!");

  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  // Automatic batching is applied by default in React 18
  function handleClick() {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 100);
  }

  // You can opt out of automatic batching by using flushSync
  function handleClickNoBatching() {
    flushSync(() => {
      setCount((c) => c + 1);
    });
    flushSync(() => {
      setFlag((f) => !f);
    });
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "4px" }}>
        <button onClick={handleClick}>Next</button>
        <button onClick={handleClickNoBatching}>Next(no batching)</button>
      </div>
      <h1 style={{ color: flag ? "blue" : "yellow" }}>{count}</h1>
    </div>
  );
}
