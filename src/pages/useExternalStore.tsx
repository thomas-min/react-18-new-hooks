import { useSyncExternalStore } from "react";

// useSyncExternalStore is a new hook that allows external stores to support concurrent reads by forcing updates to the store to be synchronous.
// It removes the need for useEffect when implementing subscriptions to external data sources, and is recommended for any library that integrates with state external to React.

export default function TodosApp() {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
    todosStore.getSnapshot
  );
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

// mock external store
let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners: Function[] = [];

const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener: Function) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
