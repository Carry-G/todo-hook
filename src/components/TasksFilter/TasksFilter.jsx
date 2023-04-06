import React from 'react'
// import PropTypes from 'prop-types'
import './TasksFilter.css'

const TasksFilter = (props) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]
  const { onFilterChange, filterButtons } = props
  const but = buttons.map(({ name, label }) => {
    const isActive = filterButtons === name
    const className = isActive ? 'selected' : ''

    return (
      <li key={name}>
        <button type="button" className={className} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{but}</ul>
}

export default TasksFilter

// static defaultProps = {
//   filterButtons: 'all',
//   onFilterChange: () => {},
// }

// static propTypes = {
//   filterButtons: PropTypes.string,
//   onFilterChange: PropTypes.func,
// }
