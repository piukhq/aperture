import React from 'react'
import {useDispatch} from 'react-redux'
import {setJwtToken} from 'features/customerWalletSlice'
import {LookupUserHistoryEntity} from 'types'
import {shortHandMonths, determineDateSuffix} from 'utils/dateFormat'
import ArrowRightSvg from 'icons/svgs/arrow-right.svg'
import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'

type Props = {
    lookupHistory: LookupUserHistoryEntity[]
}

const CustomerLookupHistory = ({lookupHistory}: Props) => {
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()

  const dispatch = useDispatch()

  const renderInnerMetadata = ({lookup, user}: LookupUserHistoryEntity, isFirstEntity = false) => {
    const {datetime} = lookup
    const {channel, display_text: displayText} = user

    const date = new Date(datetime)
    const day = date.getDate()
    const dateString = `${day}${determineDateSuffix(day)} ${shortHandMonths[date.getMonth()]} ${date.getFullYear()}`

    return (
      <div className='flex h-full items-center p-[6px] justify-between'>
        <div className='flex items-center'>
          {/* TODO: Add channel image */}
          <div className='h-[40px] w-[40px] rounded-[8px] bg-red' />

          <div className='flex flex-col justify-center items-start ml-[6px]'>
            <p className={`font-body-2 truncate ${isFirstEntity ? 'max-w-[172px]' : 'max-w-[142px]'}`}>{displayText}</p>
            <p className='font-body-4'>{dateString}</p>
          </div>
        </div>

        <ArrowRightSvg className='h-[20px] w-[20px]' />
      </div>
    )
  }

  const handleEntityClick = ({lookup, user}: LookupUserHistoryEntity) => {
    const {type, criteria} = lookup

    // TODO: Handle other types
    if (type === 'JWT') {
      dispatch(setJwtToken(criteria as string))

      putLookHistoryEntry({
        user,
        lookup,
      })
    }
  }

  return (
    <div className='flex items-center gap-[20px]'>
      {lookupHistory.map((historyEntity, index) => {
        if (index === 0) {
          return (
            <div key={index} className='h-[59px] w-[250px] shadow-md bg-white rounded-[8px]'>
              {renderInnerMetadata(historyEntity, true)}
            </div>
          )
        }
        return (
          <button onClick={() => handleEntityClick(historyEntity)} key={index} className='h-[52px] w-[220px] shadow-md bg-white rounded-[8px]'>
            <div className='absolute h-[52px] w-[220px] bg-white rounded-[8px] bg-opacity-50' />
            {renderInnerMetadata(historyEntity)}
          </button>
        )
      })}
    </div>
  )
}

export default CustomerLookupHistory
