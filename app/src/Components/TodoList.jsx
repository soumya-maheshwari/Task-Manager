import React, { useState } from "react";

const TodoList = () => {
  const handleTodo = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
  };

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <div className="app-container">
        <h1> Todo App</h1>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={handleTodo}
            placeholder="Enter your task..."
          />
          <button onClick={addTodo}>Add Task</button>
        </div>
        <ul className="todo-list"></ul>
      </div>
    </div>
  );
};

export default TodoList;
