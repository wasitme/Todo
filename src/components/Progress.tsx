import React, { FC, useEffect, useState } from 'react'
import './progress.styles.scss'
import { TasksContextType } from './TasksContext'
import { useTasksContext } from './TasksProvider'

const Progress: FC = () => {
  const tasks = useTasksContext()

  const [doneTasks, setDoneTasks] = useState<TasksContextType[] | null>(null)

  useEffect(() => {
    if (tasks) {
      setDoneTasks((tasks ?? []).filter((task) => task.completed))
    }
  }, [tasks])

  console.log('doneTasks', doneTasks)

  return (
    <div className='progress-container'>
      <div className='progress-content-container'>
        <h2 className='progress-title'>Progress</h2>
        <div className='progress-bar'>
          <div />
        </div>
        <div>{`${(doneTasks ?? []).length} completed`}</div>
      </div>
    </div>
  )
}

export default Progress
