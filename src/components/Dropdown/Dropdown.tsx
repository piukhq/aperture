import React from 'react'
import {classNames} from 'utils/classNames'
import {Listbox} from '@headlessui/react'
import TriangleDownSvg from 'icons/svgs/triangle-down.svg'
import usePermissions from 'hooks/usePermissions'
import {UserPermissions} from 'utils/enums'
import {Plan} from 'types'

type DisplayValue = string

type Props = {
  label?: string
  displayValue: string
  displayValues: DisplayValue[]
  hasShadow?: boolean
  onChangeDisplayValue: (displayValue: string) => void
  selectedValueStyles?: string
  renderFn?: (item: unknown) => JSX.Element
  isDisabled?: boolean
  requiredPermission?: UserPermissions
}

const Dropdown = ({label, displayValue, displayValues, onChangeDisplayValue, hasShadow, selectedValueStyles = '', renderFn, isDisabled = false, requiredPermission}: Props) => {

  const {hasRequiredPermission} = usePermissions()
  if (requiredPermission && !hasRequiredPermission(requiredPermission)) {
    return <p className='font-modal-data'>{displayValue}</p>
  }

  const renderDisplayValue = (value: string | Plan) => {
    if (typeof(value) === 'object') {
      return renderFn && renderFn(value)
    }
    return renderFn ? renderFn(value) : value
  }

  // Weird fix for TS bug when filtering out displayValues - https://github.com/microsoft/TypeScript/issues/44373
  const displayValuesFixed: Array<typeof displayValues[number]> = displayValues
  const filteredDisplayValues = displayValuesFixed.filter((filteredValue) => filteredValue !== displayValue)

  return (
    <Listbox as='div' value={displayValue} onChange={onChangeDisplayValue} disabled={isDisabled}
      className='flex h-full w-full pr-4'
    >
      {({open}) => (
        <div className='relative w-full'>
          <Listbox.Button className={classNames(
            'flex flex-row items-center w-full pl-[12px] text-grey-600 h-full bg-white dark:bg-grey-825 rounded-[10px] justify-between',
            open && 'rounded-none rounded-t-[10px]',
            hasShadow ? 'shadow-sm' : 'border-[1px] border-grey-500 dark:border-grey-700',
          )}
          >
            {label && (
              <Listbox.Label className='font-subheading-5 mr-[7px]'>{label}:</Listbox.Label>
            )}
            <span className={classNames(
              'font-subheading-3 font-medium truncate',
              selectedValueStyles
            )}>{(typeof(displayValue) !== 'string' && renderFn) ? renderFn(displayValue) : displayValue}</span>

            <div className='flex justify-center items-center min-w-[28px] ml-[42px] h-full border-l border-grey-200 dark:border-grey-800'>
              <TriangleDownSvg className={classNames(open && 'rotate-180')} />
            </div>
          </Listbox.Button>

          {open && (
            <Listbox.Options static className={classNames(
              'absolute z-40 w-full bg-white dark:bg-grey-825 rounded-b-[10px] overflow-y-auto max-h-[200px] pb-[8px]',
              hasShadow ? 'shadow-sm' : 'border-b-[1px] border-l-[1px] border-r-[1px] border-grey-500 dark:border-grey-700',
            )}
            >
              {filteredDisplayValues.map((value, index) => (
                <Listbox.Option
                  key={index}
                  value={value}
                  className='py-[7px] pl-[7px] cursor-pointer font-subheading-3 font-medium'
                >
                  {({active}) => (
                    <span className={active ? 'bg-lightYellow dark:bg-grey-800' : ''}>
                      { renderDisplayValue(value)}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          )}
        </div>
      )}
    </Listbox>
  )
}

export default Dropdown
