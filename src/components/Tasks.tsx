import React, { FC, useState } from 'react'
import TaskItem from './TaskItem'
import AddTaskItem from './AddTaskItem'
import { useTasksContext } from './TasksProvider'

import './tasks.styles.scss'

export type FilterType = 'All' | 'Done' | 'Undone'

type TasksPropType = {
  defaultFilter: FilterType
  onFilterChange: (value: FilterType) => void
  onAddTask: (value: string) => void
  onEditTask: (id?: string, value?: string, completed?: boolean) => void
  onDeleteTask: (id: string) => void
}

const Tasks: FC<TasksPropType> = ({
  defaultFilter,
  onFilterChange,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [isOpenDropdown, setIsOpenDropDown] = useState(false)
  const tasks = useTasksContext()

  const handleClickOption = (value: FilterType) => {
    setIsOpenDropDown(false)
    onFilterChange(value)
  }

  return (
    <div className='tasks-container'>
      <div className='tasks-title-container'>
        <span className='tasks-title'>Tasks</span>
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
      <div className='tasks-list-container'>
        {tasks?.map((task, index) => {
          return (
            <TaskItem
              key={task?.id}
              isChecked={task?.completed}
              description={task?.title}
              onEdit={({ value, isChecked }) => {
                onEditTask(
                  task?.id,
                  value ?? task?.title,
                  isChecked ?? task?.completed
                )
              }}
              onDelete={() => {
                onDeleteTask(task?.id ?? '')
              }}
            />
          )
        })}

        <AddTaskItem
          onEnter={(value) => {
            onAddTask(value)
          }}
        />
      </div>
    </div>
  )
}

export default Tasks
