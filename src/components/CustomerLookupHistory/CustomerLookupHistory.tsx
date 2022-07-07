import React from 'react'
import {useDispatch} from 'react-redux'
import {setJwtToken} from 'features/customerWalletSlice'
import {LookupUserHistoryEntity} from 'types'
import {timeStampToDate} from 'utils/dateFormat'
import ArrowRightSvg from 'icons/svgs/arrow-right.svg'
import BinkBundleSvg from 'icons/svgs/bink-bundle.svg'
import BarclaysBundleSvg from 'icons/svgs/barclays-bundle.svg'
import {useGetCustomerWalletLookupHistory} from 'hooks/useGetCustomerWalletLookupHistory'
import {BundleID} from 'utils/enums'

type Props = {
  lookupHistory: LookupUserHistoryEntity[]
}

const CustomerLookupHistory = ({lookupHistory}: Props) => {
  const {putLookHistoryEntry} = useGetCustomerWalletLookupHistory()

  const dispatch = useDispatch()

  const renderBundleIcon = (channel: string) => {
    switch (channel) {
      case BundleID.BINK_WALLET_BUNDLE_ID:
        return <BinkBundleSvg className='h-[40px] w-[40px] rounded-[4px]' />
      case BundleID.BARCLAYS_BUNDLE_ID:
        return <BarclaysBundleSvg className='h-[40px] w-[40px] rounded-[4px]' />
      default:
        // Unsure if the Bink Internal Bundle needs to be explicitly dealt with
        return <BinkBundleSvg className='h-[40px] w-[40px] rounded-[4px]' />
    }
  }

  const renderInnerMetadata = ({lookup, user}: LookupUserHistoryEntity, isFirstEntity = false) => {
    const {datetime} = lookup
    const {channel, display_text: displayText} = user

    return (
      <div className='flex h-full items-center p-[6px] justify-between'>
        <div className='flex items-center'>
          <div data-testid='bundle-icon'>
            {renderBundleIcon(channel)}
          </div>

          <div className='flex flex-col justify-center items-start ml-[6px]'>
            <p className={`font-body-2 truncate ${isFirstEntity ? 'max-w-[172px]' : 'max-w-[142px] dark:text-grey-600'}`}>{displayText}</p>
            <p className={`font-body-4 ${!isFirstEntity && 'dark:text-grey-600'}`} data-testid='date-string'>{timeStampToDate(datetime)}</p>
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
            <div data-testid='history-entity' key={index} className='h-[59px] w-[250px] shadow-md bg-white dark:bg-grey-825 rounded-[8px]'>
              {renderInnerMetadata(historyEntity, true)}
            </div>
          )
        }
        return (
          <button data-testid='history-entity' onClick={() => handleEntityClick(historyEntity)} key={index} className='h-[52px] w-[220px] shadow-md bg-white dark:bg-grey-950 rounded-[8px]'>
            <div className='absolute h-[52px] w-[220px] bg-white rounded-[8px] bg-opacity-50 dark:bg-opacity-20' />
            {renderInnerMetadata(historyEntity)}
          </button>
        )
      })}
    </div>
  )
}

export default CustomerLookupHistory
