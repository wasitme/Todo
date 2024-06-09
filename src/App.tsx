import React, { useState } from 'react'

import TasksProvider from './components/TasksProvider'
import Progress from './components/Progress'
import Tasks, { FilterType } from './components/Tasks'
import './app.styles.scss'

const App = () => {
  const [filterValue, setFilterValue] = useState<FilterType>('All')

  const handleFilterChange = (value: FilterType) => {
    console.log('value', value)
    setFilterValue(value)
  }

  return (
    <div className='main-container'>
      <TasksProvider>
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
