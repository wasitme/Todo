import { createContext } from 'react'

export type TasksContextType = {
  id?: string
  title?: string
  completed?: boolean
}[]

export const TasksContext = createContext<TasksContextType>([
  { id: undefined, title: undefined, completed: undefined },
])
