import {useEffect, useState} from 'react'
import Button from 'components/Button'
import {ButtonBackground, ButtonSize, ButtonWidth, LabelColour, LabelWeight} from 'components/Button/styles'
import ArrowDownSVG from 'icons/svgs/arrow-down.svg'
import {DirectoryLocations, DirectoryMerchant, DirectoryMids, DirectoryPsimis, DirectorySecondaryMids} from 'types'
import {useAppSelector} from 'app/hooks'
import {useRouter} from 'next/router'
import {getMerchantEntityCountFromPaymentSchemes} from 'utils/paymentSchemes'
import {DirectoryNavigationTab} from 'utils/enums'


type Props = {
  currentData: DirectoryPsimis | DirectorySecondaryMids | DirectoryLocations | DirectoryMids,
  currentPage: number,
  setPageFn: React.Dispatch<React.SetStateAction<number>>
  setShouldSkipGetEntityByPage: React.Dispatch<React.SetStateAction<boolean>>
}

const DirectoryMerchantPaginationButton = ({currentData, currentPage, setPageFn, setShouldSkipGetEntityByPage}: Props) => {
  const [entityCount, setEntityCount] = useState(0)
  const [shouldRefresh, setShouldRefresh] = useState(false)

  const router = useRouter()
  const tab = router.query.tab as DirectoryNavigationTab
  const selectedMerchant = useAppSelector(state => state.directoryMerchant.selectedMerchant) as DirectoryMerchant

  useEffect(() => {
    const paymentSchemes = selectedMerchant?.merchant_counts?.payment_schemes
    if (paymentSchemes) {
      if(tab === DirectoryNavigationTab.LOCATIONS) {
        setEntityCount(selectedMerchant?.merchant_counts?.locations)
      } else {
        setEntityCount(getMerchantEntityCountFromPaymentSchemes(tab, paymentSchemes))
      }
    }
  }, [selectedMerchant, tab])


  useEffect(() => {
    if (currentData?.length < entityCount && currentData?.length % 20 !== 0) {
      setShouldRefresh(true)
    } else {
      setShouldRefresh(false)
    }
  }, [currentData, currentPage, entityCount])

  const handlePaginationClick = () => {
    if (currentData?.length < entityCount && entityCount > currentPage * 20) {
      setShouldSkipGetEntityByPage(false)
      setPageFn((prevPage: number) => prevPage + 1)
    }
  }

  const handleRefreshClick = () => { // simple solution too handle edge case where items are deleted and counts need a full reset
    window.location.reload()
  }

  if (currentData?.length < entityCount) {
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
