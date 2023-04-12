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
    <div className="p-4">
      <p className="text-2xl mb-4">
        Count :
        <span className={flag ? "text-blue-500" : "text-yellow-500"}>
          {count}
        </span>
      </p>
      <section className="flex gap-2">
        <button className="btn btn-primary" onClick={handleClick}>
          Next
        </button>
        <button className="btn btn-secondary" onClick={handleClickNoBatching}>
          Next(no batching)
        </button>
      </section>
    </div>
  );
}
