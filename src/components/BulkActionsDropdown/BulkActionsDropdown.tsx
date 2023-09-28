import React from 'react'

type Props = {
  actionsMenuItems: {
    label: string
    handleClick: () => void
    buttonStyle: string
  }[],
  isDisabled?: boolean

}

const BulkActionsDropdown = ({actionsMenuItems = [], isDisabled}: Props) => (
  <select
    className={`h-[38px] flex-wrap border border-grey-400 dark:border-grey-600 rounded-[10px] font-heading text-sm pl-2 mb-4 mx-1 bg-transparent text-grey-700 dark:text-grey-500 duration-300 ${!isDisabled && 'shadow-sm'}`}
    value='default'
    disabled={isDisabled}
    onChange={(e) => {
      actionsMenuItems.find(item => item.label === e.target.value)?.handleClick()
    }}
  >
    <option value='default' disabled hidden>Bulk actions</option>
    {actionsMenuItems.map((item, index) => (
      <option key={index} value={item.label}>{item.label}</option>
    ))}
  </select>
)

export default BulkActionsDropdown
