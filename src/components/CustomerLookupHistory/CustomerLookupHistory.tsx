import React from 'react'
import {LookupUserHistoryEntity} from 'types'
import {timeStampToDate} from 'utils/dateFormat'
import ArrowRightSvg from 'icons/svgs/arrow-right.svg'
import Image from 'next/image'
import BarclaysBundleSvg from 'icons/svgs/barclays-bundle.svg'
import {BundleID} from 'utils/enums'
import {useAppSelector} from 'app/hooks'
import {getActiveUserId} from 'features/customerWalletSlice'

type Props = {
  lookupHistory: LookupUserHistoryEntity[]
  jwtCustomerLookup: (criteria: string, type: string) => void
}

const CustomerLookupHistory = ({lookupHistory, jwtCustomerLookup}: Props) => {
  const activeUserId = useAppSelector(getActiveUserId)

  const renderBundleIcon = (channel: string) => {
    switch (channel) {
      case BundleID.BINK_WALLET_BUNDLE_ID:
        return <Image width={40} height={40} src='/icons/pngs/bink-bundle.png' alt='Bink channel'/>
      case BundleID.BARCLAYS_BUNDLE_ID:
      default:
        return <BarclaysBundleSvg className='h-[40px] w-[40px] rounded-[4px]' />
        // Unsure if the Bink Internal Bundle needs to be explicitly dealt with
    }
  }

  const renderInnerMetadata = ({lookup, user}: LookupUserHistoryEntity, isActiveLookupUser = false) => {
    const {datetime} = lookup
    const {channel, display_text: displayText} = user

    return (
      <div className='flex h-full items-center p-[6px] justify-between'>
        <div className='flex items-center'>
          <div data-testid='bundle-icon'>
            {renderBundleIcon(channel)}
          </div>
          <div className='flex flex-col justify-center items-start ml-[6px]'>
            <p className={`font-body-2 truncate ${isActiveLookupUser ? 'max-w-[172px]' : 'max-w-[142px] dark:text-grey-600'}`}>{displayText}</p>
            <p className={`font-body-4 ${!isActiveLookupUser && 'dark:text-grey-600'}`} data-testid='date-string'>{timeStampToDate(datetime)}</p>
          </div>
        </div>
        <ArrowRightSvg className='h-[20px] w-[20px]' />
      </div>
    )
  }

  const handleEntityClick = ({lookup}: LookupUserHistoryEntity) => { // TODO: Handle other lookup types
    lookup.type === 'JWT' && jwtCustomerLookup(lookup.criteria as string, lookup.type)
  }

  return (
    <div className='flex items-center gap-[20px] h-[59px]'>
      {lookupHistory.map((historyEntity, index) => {
        if (historyEntity.user.user_id === activeUserId) {
          return (
            <div data-testid='history-entity' key={index} className='w-[250px] shadow-md bg-white dark:bg-grey-825 rounded-[8px]'>
              {renderInnerMetadata(historyEntity, true)}
            </div>
          )
        }
        return (
          <button data-testid='previous-history-entity' onClick={() => handleEntityClick(historyEntity)} key={index} className='h-[52px] w-[220px] shadow-md bg-white dark:bg-grey-950 rounded-[8px]'>
            <div className='absolute h-[52px] w-[220px] bg-white rounded-[8px] bg-opacity-50 dark:bg-opacity-20' />
            {renderInnerMetadata(historyEntity)}
          </button>
        )
      })}
    </div>
  )
}

export default CustomerLookupHistory
