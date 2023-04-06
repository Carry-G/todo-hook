import React, { useState } from 'react'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'

import './App.css'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [filterButtons, setFilterButtons] = useState('all')

  const addItem = (label, time) => {
    const newItem = {
      label,
      time,
      completed: false,
      id: Date.now(),
      check: false,
      date: new Date(),
      editing: false,
    }
    setTodoData((prevTodoData) => [...prevTodoData, newItem])
  }

  const deleteTask = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((item) => item.id === id)
      return [...prevTodoData.slice(0, idx), ...prevTodoData.slice(idx + 1)]
    })
  }

  const onToggleCompleted = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((item) => item.id === id)
      const oldItem = prevTodoData[idx]
      const newItems = {
        ...oldItem,
        completed: !oldItem.completed,
        check: !oldItem.check,
      }
      return [...prevTodoData.slice(0, idx), newItems, ...prevTodoData.slice(idx + 1)]
    })
  }

  const onFilterChange = (newFilterButtons) => {
    setFilterButtons(newFilterButtons)
  }

  const clearCompleted = () => {
    const clearTask = todoData.filter((item) => !item.completed)
    setTodoData(clearTask)
  }

  const filterItem = () => {
    switch (filterButtons) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((item) => !item.completed)
      case 'completed':
        return todoData.filter((item) => item.completed)
      default:
        return todoData
    }
  }

  const changeInput = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((item) => item.id === id)
      const oldItem = prevTodoData[idx]
      const newItems = { ...oldItem, editing: !oldItem.editing }
      return [...prevTodoData.slice(0, idx), newItems, ...prevTodoData.slice(idx + 1)]
    })
  }

  const changeTimer = (id, newTime) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((item) => item.id === id)
      const oldItem = prevTodoData[idx]
      if (typeof oldItem === 'undefined') return prevTodoData
      const newItems = { ...oldItem, time: newTime }
      return [...prevTodoData.slice(0, idx), newItems, ...prevTodoData.slice(idx + 1)]
    })
  }

  const itemsCount = todoData.length !== 0 ? todoData.filter((item) => !item.completed).length : null

  return (
    <div className="todoapp">
      <section className="header">
        <NewTaskForm onItemAdded={addItem} />
      </section>
      <section className="main">
        <TaskList
          todos={filterItem()}
          onDeleted={deleteTask}
          onToggleCompleted={onToggleCompleted}
          changeInput={changeInput}
          changeTimer={changeTimer}
        />
        <Footer
          itemsCount={itemsCount}
          filterButtons={filterButtons}
          onFilterChange={onFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
    </div>
  )
}
export default App
