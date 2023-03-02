import Button from 'components/Button'
import {ButtonBackground, ButtonSize, ButtonWidth, LabelColour, LabelWeight} from 'components/Button/styles'
import ArrowDownSVG from 'icons/svgs/arrow-down.svg'
import {DirectoryLocations, DirectoryMids, DirectoryPsimis, DirectorySecondaryMids} from 'types'

type Props = {
  currentData: DirectoryPsimis | DirectorySecondaryMids | DirectoryLocations | DirectoryMids,
  setPageFn: React.Dispatch<React.SetStateAction<number>>
}

const DirectoryMerchantPaginationButton = ({currentData, setPageFn}: Props) => {
  if (currentData && currentData.length % 10 === 0 && currentData.length !== 0) {
    return <div className='w-full flex justify-center p-4'>
      <Button
        handleClick={() => setPageFn((prevPage: number) => prevPage + 1)}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.AUTO}
        buttonBackground={ButtonBackground.BLUE}
        labelColour={LabelColour.WHITE}
        labelWeight={LabelWeight.MEDIUM}
      ><ArrowDownSVG fill='white' /> Show more
      </Button>
    </div>
  }
  return null
}

export default DirectoryMerchantPaginationButton
