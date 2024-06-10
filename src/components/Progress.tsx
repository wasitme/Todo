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

  const getPercent = () => {
    const percent = (doneTasks?.length ?? 0 * 100) / (tasks?.length ?? 1)
    return `${percent * 100}%`
  }

  return (
    <div className='progress-container'>
      <div className='progress-content-container'>
        <div className='progress-title'>Progress</div>
        <div className='progress-bar'>
          <div style={{ width: getPercent() }} />
        </div>
        <div className='progress-description'>{`${
          (doneTasks ?? []).length
        } completed`}</div>
      </div>
    </div>
  )
}

export default Progress
