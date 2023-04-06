import React, { useState, useEffect, useRef } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

const Task = (props) => {
  const { item, onDeleted, onToggleCompleted, changeInput, changeTimer } = props
  const { time, completed, date, check, id, label, editing } = item
  const [labelTask, setLabelTask] = useState(label)
  const [timeTask, setTimeTask] = useState(time)
  const [play, setPlay] = useState(false)
  const textInput = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      if (play && timeTask !== 0) {
        setTimeTask((prevTimeTask) => prevTimeTask - 1)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
      changeTimer(id, timeTask)
    }
  }, [play, timeTask])

  useEffect(() => {
    if (editing) {
      textInput.current.focus()
    }
  }, [editing])

  const onLabelChange = (event) => {
    setLabelTask(event.target.value)
  }

  const onClickEnter = (event) => {
    if (event.keyCode === 13) {
      changeInput()
    }
  }

  const minutes = Math.floor(timeTask / 60)
  const seconds = timeTask - minutes * 60
  const timeCreat = new Date()
  const result = formatDistance(date, timeCreat, { includeSeconds: true })
  let classNamesTask
  if (completed) {
    classNamesTask = ' completed'
  }
  if (editing) {
    classNamesTask = ' editing'
  }
  return (
    <li className={classNamesTask}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={check} onChange={() => onToggleCompleted(id)} />
        <label>
          <span className="title" onClick={() => onToggleCompleted(id)} aria-hidden="true">
            {labelTask}
          </span>
          <span className="description">
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            <button type="button" className="icon icon-play" aria-label="play" onClick={() => setPlay(true)} />
            <button type="button" className="icon icon-pause" aria-label="pause" onClick={() => setPlay(false)} />
          </span>
          <span className="description">{`created ${result} ago`}</span>
        </label>
        <button
          type="button"
          aria-label="edit"
          className="icon icon-edit"
          onClick={completed ? null : () => changeInput()}
        />
        <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={() => onDeleted(id)} />
      </div>
      <input
        type="text"
        onChange={onLabelChange}
        value={labelTask}
        className="edit"
        onKeyDown={onClickEnter}
        ref={textInput}
      />
    </li>
  )
}
Task.defaultProps = {
  item: {},
  onDeleted: () => {},
  onToggleCompleted: () => {},
  changeInput: () => {},
  changeTimer: () => {},
}

Task.propTypes = {
  item: PropTypes.instanceOf(Object),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  changeInput: PropTypes.func,
  changeTimer: PropTypes.func,
}
export default Task
