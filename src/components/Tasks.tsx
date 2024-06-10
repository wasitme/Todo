import React, { FC, useState, useEffect } from 'react'
import TaskItem from './TaskItem'
import AddTaskItem from './AddTaskItem'
import { useTasksContext } from './TasksProvider'

import './tasks.styles.scss'

export type FilterType = 'All' | 'Done' | 'Undone'

type TasksPropType = {
  onAddTask: (value: string) => void
  onEditTask: (id?: string, value?: string, completed?: boolean) => void
  onDeleteTask: (id: string) => void
}

const Tasks: FC<TasksPropType> = ({ onAddTask, onEditTask, onDeleteTask }) => {
  const tasks = useTasksContext()

  const [isOpenDropdown, setIsOpenDropDown] = useState(false)
  const [filterValue, setFilterValue] = useState<FilterType>('All')
  const [tasksData, setTasksData] = useState(tasks)

  const handleClickFilterOption = (value: FilterType) => {
    setIsOpenDropDown(false)
    setFilterValue(value)
    switch (value) {
      case 'All':
        setTasksData(tasks)
        break
      case 'Done':
        setTasksData((tasks ?? []).filter((task) => task.completed))
        break
      case 'Undone':
        setTasksData((tasks ?? []).filter((task) => !task.completed))
        break
      default:
        return setTasksData(tasks)
    }
  }

  useEffect(() => {
    if (tasks) setTasksData(tasks)
  }, [tasks])

  return (
    <div className='tasks-container'>
      <div className='tasks-title-container'>
        <span className='tasks-title'>Tasks</span>
        <div className='tasks-select-custom'>
          <button
            className='tasks-select-button'
            onMouseDown={() => {
              setIsOpenDropDown(!isOpenDropdown)
            }}
            onBlur={() => setIsOpenDropDown(false)}
          >
            {filterValue}
            <div className='tasks-arrow-down' />
          </button>
          <div
            id='tasks-select-dropdown'
            className={
              isOpenDropdown
                ? 'tasks-dropdown-content'
                : 'tasks-dropdown-content inactive'
            }
          >
            <div onMouseDown={() => handleClickFilterOption('All')}>All</div>
            <div onMouseDown={() => handleClickFilterOption('Done')}>Done</div>
            <div onMouseDown={() => handleClickFilterOption('Undone')}>
              Undone
            </div>
          </div>
        </div>
      </div>
      <div className='tasks-list-container'>
        {tasksData?.map((task, index) => {
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
