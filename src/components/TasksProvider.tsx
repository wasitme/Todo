import React, { FC, PropsWithChildren, useContext } from 'react'
import { TasksContext } from './TasksContext'

const TasksProvider: FC<PropsWithChildren> = ({ children }) => {
  return <TasksContext.Provider value={[]}>{children}</TasksContext.Provider>
}

export const useTasks = () => {
  return useContext(TasksContext)
}

export default TasksProvider
