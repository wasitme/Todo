import React, { FC, SyntheticEvent, useState } from 'react'
import './taskitem.styles.scss'

type TaskItemPropType = {
  isChecked?: boolean
  description?: string
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onSave: (input: string) => void
}

const TaskItem: FC<TaskItemPropType> = ({
  isChecked = false,
  description = '',
  onEdit = () => undefined,
  onDelete = () => undefined,
  onSave = () => undefined,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isOpenDropdown, setIsOpenDropDown] = useState(false)
  const [inputVal, setInputVal] = useState(description)

  const handleToggleCheckbox = (e: SyntheticEvent) => {}

  const handleClickSave = () => {
    setIsEdit(false)
    onSave(inputVal)
  }

  return (
    <>
      {isEdit ? (
        <div className='task-item-container edit'>
          <input
            className='task-item-input'
            autoFocus
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value)
            }}
          />
          <div className='task-item-save-btn' onClick={handleClickSave}>
            Save
          </div>
        </div>
      ) : (
        <div className='task-item-container'>
          <div
            className={
              isChecked
                ? 'task-item-description checked'
                : 'task-item-description'
            }
          >
            <div
              className={
                isChecked
                  ? 'tasks-item-check-box checked'
                  : 'tasks-item-check-box'
              }
              onClick={handleToggleCheckbox}
            />
            <label>{description}</label>
          </div>
          <div className='tasks-item-more-action'>
            <div onClick={() => setIsOpenDropDown(!isOpenDropdown)}>...</div>
            <div
              className={
                isOpenDropdown
                  ? 'tasks-item-more-action-dropdown'
                  : 'tasks-item-more-action-dropdown hide'
              }
            >
              <div
                onClick={() => {
                  setIsEdit(true)
                  setIsOpenDropDown(false)
                }}
              >
                Edit
              </div>
              <div style={{ color: '#F07579' }}>Delete</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskItem
