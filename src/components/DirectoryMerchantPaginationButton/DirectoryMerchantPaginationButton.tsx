import {useEffect, useState} from 'react'
import Button from 'components/Button'
import {ButtonBackground, ButtonSize, ButtonWidth, LabelColour, LabelWeight} from 'components/Button/styles'
import ArrowDownSVG from 'icons/svgs/arrow-down.svg'
import {DirectoryLocations, DirectoryMids, DirectoryPsimis, DirectorySecondaryMids} from 'types'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import {getMerchantEntityCountFromPaymentSchemes} from 'utils/paymentSchemes'
import {DirectoryNavigationTab} from 'utils/enums'
import {useDirectoryMerchants} from 'hooks/useDirectoryMerchants'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {getSelectedDirectoryTableCheckedRows, setSelectedDirectoryTableCheckedRows} from 'features/directoryMerchantSlice'

type Props = {
  currentData: DirectoryPsimis | DirectorySecondaryMids | DirectoryLocations | DirectoryMids,
  currentPage: number,
  setPageFn: React.Dispatch<React.SetStateAction<number>>
  setShouldSkipGetEntityByPage: React.Dispatch<React.SetStateAction<boolean>>
}

const DirectoryMerchantPaginationButton = ({currentData, currentPage, setPageFn, setShouldSkipGetEntityByPage}: Props) => {
  const dispatch = useAppDispatch()
  const selectedCheckedRows = useAppSelector(getSelectedDirectoryTableCheckedRows)

  const [merchantEntityCount, setMerchantEntityCount] = useState<number>(0)
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
  const {tab, planId, merchantId} = useGetRouterQueryString()

  const {
    getMerchantResponse,
  } = useDirectoryMerchants({
    skipGetMerchantCounts: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const dataCount = currentData?.length

  useEffect(() => {
    const paymentSchemes = getMerchantResponse?.merchant_counts?.payment_schemes
    if (paymentSchemes) {
      if(tab === DirectoryNavigationTab.LOCATIONS) {
        setMerchantEntityCount(getMerchantResponse?.merchant_counts?.locations)
      } else {
        setMerchantEntityCount(getMerchantEntityCountFromPaymentSchemes(tab as DirectoryNavigationTab, paymentSchemes))
      }
    }
  }, [getMerchantResponse, tab])

  useEffect(() => {
    if (dataCount < merchantEntityCount && dataCount % 20 !== 0) {
      setShouldRefresh(true)
    } else {
      setShouldRefresh(false)
    }
  }, [currentPage, dataCount, merchantEntityCount])

  const handlePaginationClick = () => {
    if (dataCount < merchantEntityCount && merchantEntityCount > currentPage * 20) {
      setShouldSkipGetEntityByPage(false)
      setPageFn((prevPage: number) => prevPage + 1)
      // add new rows to selectedCheckedRows
      const newRows = new Array(merchantEntityCount - dataCount).fill(false)
      dispatch(setSelectedDirectoryTableCheckedRows([...selectedCheckedRows, ...newRows]))
    }
  }

  const handleRefreshClick = () => { // heavy but simple solution to handle edge case where items are deleted and counts need a full reset
    window.location.reload()
  }

  if (merchantEntityCount > dataCount) {
    return <div className='w-full flex justify-center p-4'>
      <Button
        handleClick={shouldRefresh ? handleRefreshClick : handlePaginationClick}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.MEDIUM}
      ><ArrowDownSVG fill='white' /> {shouldRefresh ? 'Refresh list' : 'Show more'}
      </Button>
    </div>
  }
  return null
}

export default DirectoryMerchantPaginationButton
