import { useSyncExternalStore } from "react";

// useSyncExternalStore is a new hook that allows external stores to support concurrent reads by forcing updates to the store to be synchronous.
// It removes the need for useEffect when implementing subscriptions to external data sources, and is recommended for any library that integrates with state external to React.

export default function TodosApp() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
    // for ssr
    todosStore.getSnapshot
  );
  return (
    <div className="p-4">
      <button className="btn btn-primary" onClick={() => todosStore.addTodo()}>
        Add todo
      </button>
      <hr className="my-4" />
      <ul>
        {todos.map((todo) => (
          <li className="text-xl mb-1" key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// mock pub sub external store
let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners: Set<Function> = new Set();

const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener: Function) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange() {
  for (let listener of listeners) {
    console.log("emitChange");
    console.log(listener);
    listener();
  }
}
