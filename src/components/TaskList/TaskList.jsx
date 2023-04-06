import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleCompleted, changeInput, changeTimer }) => {
  const element = todos.map((item) => {
    return (
      <Task
        key={item.id}
        item={item}
        onDeleted={() => onDeleted(item.id)}
        onToggleCompleted={() => onToggleCompleted(item.id)}
        changeInput={() => changeInput(item.id)}
        changeTimer={(id, newTime) => changeTimer(id, newTime)}
      />
    )
  })

  return <ul className="todo-list">{element}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCompleted: () => {},
  changeInput: () => {},
  changeTimer: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  changeInput: PropTypes.func,
  changeTimer: PropTypes.func,
}
export default TaskList
