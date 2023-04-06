import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = (props) => {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onMinChange = (event) => {
    setMinutes(event.target.value)
  }

  const onSecChange = (event) => {
    setSeconds(event.target.value)
  }

  const onLabelChange = (event) => {
    setLabel(event.target.value)
  }

  const onSubmit = (event) => {
    const time = Number(minutes) * 60 + Number(seconds)
    event.preventDefault()
    if (label.trim() === '') {
      event.preventDefault()
      return
    }
    const { onItemAdded } = props
    onItemAdded(label, time)
    setLabel('')
    setMinutes('')
    setSeconds('')
  }
  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={onSubmit} className="new-todo-form">
        <input className="new-todo" placeholder="What needs to be done?" onChange={onLabelChange} value={label} />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinChange}
          value={minutes}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecChange}
          value={seconds}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  )
}
NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
export default NewTaskForm
