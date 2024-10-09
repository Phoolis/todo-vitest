import './App.css'
import TodoTable from './TodoTable';
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState({ desc: "", date: "" });
  const [todos, setTodos] = useState([]);

  const addTodo = (event) => {
    setTodos([...todos, todo]);
    setTodo({ desc: "", date: "" });
  };

  const clearTodos = (event) => {
    setTodos([]);
  }

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h1>My Todolist</h1>
      <div className="App">
        <input
          placeholder="Date"
          name="date"
          value={todo.date}
          onChange={inputChanged}
        />
        <input
          placeholder="Description"
          name="desc"
          value={todo.desc}
          onChange={inputChanged}
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={clearTodos}>Clear</button>
        <TodoTable todos={todos} />
      </div>
    </>
  );
}

export default App
