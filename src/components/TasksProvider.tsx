import React, { FC, useContext } from 'react'
import { TasksContext, TasksContextType } from './TasksContext'

type TasksProviderType = {
  children: React.ReactNode
  value: TasksContextType
}

const TasksProvider: FC<TasksProviderType> = ({ children, value }) => {
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export const useTasksContext = () => {
  return useContext(TasksContext)
}

export default TasksProvider
