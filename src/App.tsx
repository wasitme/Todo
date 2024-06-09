import React, { useState } from 'react'

import TasksProvider from './components/TasksProvider'
import Progress from './components/Progress'
import Tasks, { FilterType } from './components/Tasks'
import useFetch from './hooks/useFetch'

import './app.styles.scss'

const App = () => {
  const fetchHook = useFetch('http://localhost:3001/todos')

  const [filterValue, setFilterValue] = useState<FilterType>('All')

  const handleFilterChange = (value: FilterType) => {
    console.log('value', value)
    setFilterValue(value)
  }

  console.log('fetchHook', fetchHook)

  return (
    <div className='main-container'>
      <TasksProvider value={fetchHook?.data}>
        <div className='content-container'>
          <Progress />
          <Tasks
            defaultFilter={filterValue}
            onFilterChange={handleFilterChange}
          />
        </div>
      </TasksProvider>
    </div>
  )
}

export default App
