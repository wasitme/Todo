import React, { FC, useState } from 'react'
import TaskItem from './TaskItem'

import './tasks.styles.scss'

export type FilterType = 'All' | 'Done' | 'Undone'

type TasksPropType = {
  defaultFilter: FilterType
  onFilterChange: (value: FilterType) => void
}

const Tasks: FC<TasksPropType> = ({ defaultFilter, onFilterChange }) => {
  const [isOpenDropdown, setIsOpenDropDown] = useState(false)

  const handleClickOption = (value: FilterType) => {
    setIsOpenDropDown(false)
    onFilterChange(value)
  }

  return (
    <div className='tasks-container'>
      <div className='tasks-title'>
        <h4>Tasks</h4>
        <div className='tasks-select-custom'>
          <button
            className='tasks-select-button'
            onClick={(e) => {
              setIsOpenDropDown(!isOpenDropdown)
            }}
          >
            {defaultFilter}
            <div className='tasks-arrow-down' />
          </button>
          <div
            id='tasks-select-dropdown'
            className={
              isOpenDropdown
                ? 'tasks-dropdown-content-active'
                : 'tasks-dropdown-content-inactive'
            }
          >
            <div onClick={() => handleClickOption('All')}>All</div>
            <div onClick={() => handleClickOption('Done')}>Done</div>
            <div onClick={() => handleClickOption('Undone')}>Undone</div>
          </div>
        </div>
      </div>
      <div>
        <TaskItem
          isChecked={true}
          description='test task'
          onEdit={() => console.log('edit')}
          onDelete={() => console.log('delete')}
          onSave={(value) => console.log('save', value)}
        />
      </div>
    </div>
  )
}

export default Tasks
