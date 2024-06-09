import React, { useEffect, useState } from 'react'

import TasksProvider from './components/TasksProvider'

import Progress from './components/Progress'
import Tasks, { FilterType } from './components/Tasks'
import useFetch from './hooks/useFetch'

import './app.styles.scss'

const App = () => {
  const fetchHook = useFetch()

  const [filterValue, setFilterValue] = useState<FilterType>('All')

  const handleFilterChange = (value: FilterType) => {
    console.log('value', value)
    setFilterValue(value)
  }

  const handleAddTask = (value: string) => {
    fetchHook.post({
      id: crypto.randomUUID() as string,
      title: value,
      completed: false,
    })
  }

  useEffect(() => {
    fetchHook?.get()
  }, [])

  return (
    <div className='main-container'>
      <TasksProvider value={fetchHook?.data}>
        <div className='content-container'>
          <Progress />
          <Tasks
            defaultFilter={filterValue}
            onFilterChange={handleFilterChange}
            onAddTask={handleAddTask}
          />
        </div>
      </TasksProvider>
    </div>
  )
}

export default App
