import React, { FC, useState } from 'react'
import './taskitem.styles.scss'

type TaskItemPropType = {
  isChecked?: boolean
  description?: string
  onEdit: (params: { value?: string; isChecked?: boolean }) => void
  onDelete: () => void
}

const TaskItem: FC<TaskItemPropType> = ({
  isChecked = false,
  description = '',
  onEdit = () => undefined,
  onDelete = () => undefined,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isOpenDropdown, setIsOpenDropDown] = useState(false)
  const [inputVal, setInputVal] = useState(description)

  const handleToggleCheckbox = () => {
    onEdit({ isChecked: !isChecked })
  }

  const handleClickSave = () => {
    setIsEdit(false)
    onEdit({ value: inputVal })
  }

  const handleClickDel = () => {
    setIsOpenDropDown(false)
    onDelete()
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
            >
              <div className='tasks-item-checkmark-icon' />
            </div>
            <label>{description}</label>
          </div>
          <div className='tasks-item-more-action'>
            <input
              className='tasks-item-action-input'
              onMouseDown={() => setIsOpenDropDown(!isOpenDropdown)}
              onBlur={() => {
                setIsOpenDropDown(false)
              }}
              value='...'
              type='button'
            />
            <div
              className={
                isOpenDropdown
                  ? 'tasks-item-more-action-dropdown'
                  : 'tasks-item-more-action-dropdown hide'
              }
            >
              <div
                onMouseDown={() => {
                  setIsEdit(true)
                  setIsOpenDropDown(false)
                }}
              >
                Edit
              </div>
              <div
                style={{ color: '#F07579' }}
                onClick={() => {
                  handleClickDel()
                }}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TaskItem
