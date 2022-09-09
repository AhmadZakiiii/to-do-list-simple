import React, { useState, useEffect } from "react";
import "./App.css";

const LOCAL_STORAGE_KEY = "to-do-list-todos";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setItems(storageTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem() {
    const item = {
      id: +new Date(),
      value: newItem,
    };
    setItems((oldList) => [...oldList, item]);

    setNewItem("");
  }

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <h1>Todo List App</h1>

      <input
        type="text"
        placeholder="Add To Do"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />

      <button onClick={() => addItem()}>Add</button>

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.value}{" "}
              <button onClick={() => deleteItem(item.id)}>X</button>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
