import React, { FC, useState, KeyboardEvent } from 'react'
import './addtaskitem.styles.scss'

type AddTaskItemPropType = {
  onEnter: (value: string) => void
}

const AddTaskItem: FC<AddTaskItemPropType> = ({ onEnter }) => {
  const [addValue, setAddValue] = useState('')
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onEnter(addValue)
      setAddValue('')
    }
  }

  return (
    <div className='add-task-item-container'>
      <input
        className='add-task-item-input'
        placeholder='Add your todo...'
        value={addValue}
        onChange={(e) => {
          setAddValue(e.target.value)
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default AddTaskItem
