import React, { useEffect, useState } from 'react'

import TasksProvider from './components/TasksProvider'
import { TasksContextType } from './components/TasksContext'

import Progress from './components/Progress'
import Tasks, { FilterType } from './components/Tasks'
import useFetch from './hooks/useFetch'

import './app.styles.scss'

const App = () => {
  const fetchHook = useFetch()

  const [filterValue, setFilterValue] = useState<FilterType>('All')
  const [tasksList, setTasksList] = useState<TasksContextType[] | null>(null)

  const handleFilterChange = (value: FilterType) => {
    setFilterValue(value)
    switch (value) {
      case 'All':
        setTasksList(fetchHook?.data)
        break
      case 'Done':
        setTasksList((fetchHook?.data ?? []).filter((task) => task.completed))
        break
      case 'Undone':
        setTasksList((fetchHook?.data ?? []).filter((task) => !task.completed))
        break
      default:
        return setTasksList(fetchHook?.data)
    }
  }

  const handleAddTask = (value: string) => {
    fetchHook.post({
      id: crypto.randomUUID() as string,
      title: value,
      completed: false,
    })
  }

  const handleEditTask = (id?: string, value?: string, completed?: boolean) => {
    fetchHook.put({
      id,
      title: value,
      completed,
    })
  }

  const handleDeleteTask = (id?: string) => {
    fetchHook.del(id)
  }

  useEffect(() => {
    fetchHook?.get()
  }, [])

  useEffect(() => {
    if (fetchHook?.data) {
      setTasksList(fetchHook?.data)
    }
  }, [fetchHook?.data])

  return (
    <div className='main-container'>
      <TasksProvider value={tasksList}>
        <div className='content-container'>
          <Progress />
          <Tasks
            defaultFilter={filterValue}
            onFilterChange={handleFilterChange}
            onAddTask={handleAddTask}
            onEditTask={(id, value, completed) =>
              handleEditTask(id, value, completed)
            }
            onDeleteTask={(id) => {
              handleDeleteTask(id)
            }}
          />
        </div>
      </TasksProvider>
    </div>
  )
}

export default App
