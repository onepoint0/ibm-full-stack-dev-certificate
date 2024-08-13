import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});

  const handleDeleteTodoList = (idx) => {
    const todosCopy = [...todos]
    todosCopy.splice(idx, 1)
    setTodos(todosCopy)
  }

  const handleAddTodoList = () => {
    setTodos([...todos, { heading: headingInput, list: [] }])
    setHeadingInput('')
  }

  const handleListInputChange = (idx, val) => {
    if (listInputs[index] && listInputs[index].trim() !== '') {
      setListInputs({ ...listInputs, [idx]: val }) // computed property names https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    }
  }

  const handleAddListItem = idx => {
    const todosCopy = [...todos]
    todosCopy[idx].list.push(listInputs[idx])
    setTodos(todosCopy)
    setListInputs({ ...listInputs, [idx]: '' })
  }

  // console.log('todos = ', todos);

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={e => setHeadingInput(e.target.value)}
          />
          <button onClick={handleAddTodoList} className="add-list-button">Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((t, idx) => (
          <div key={idx} className="todo-card">
            <div className="heading-todo">
              <h3>{t.heading}</h3>
              <button onClick={() => handleDeleteTodoList(idx)} className="delete-button-heading">
                Delete?
              </button>
            </div>
            <div className='add_list'>
              <ul>
                {todos[idx].list.map((l, listIdx) => (
                  <li key={listIdx} className='todo_inside_list'>{l}</li>
                ))}
              </ul>
              <input
                type="text"
                className="list-input"
                placeholder="Add Item"
                value={listInputs[idx] || ''}
                onChange={e => handleListInputChange(idx, e.target.value)} />
              <button className="add-list-button" onClick={() => handleAddListItem(idx)}>Add List</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
