import {Button, Modal, Tag} from 'components'
import Image from 'next/image'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import SearchSvg from 'icons/svgs/search.svg'

import {useAppSelector} from 'app/hooks'

import {getSelectedPlanAsset} from 'features/planAssetsSlice'

const AssetModal = () => {
  const selectedAsset = useAppSelector(getSelectedPlanAsset)

  const {id, type, url, description, encoding} = selectedAsset

  const renderEnvironmentTags = () => (
    <div className='border-b-2 border-grey-500'>
      <h3 className='font-heading-9'>Environment</h3>
      <div className='flex gap-[8px] pt-[7px] pb-[24px]'>
        <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.AQUAMARINE_FILLED} label='D' />
        <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.YELLOW_FILLED} label='S' />
      </div>
    </div>
  )

  const renderImageSection = () => (
    <div className='w-full h-[230px] bg-grey-600 flex '>
      <div className='bg-orange w-[50px] h-full flex justify-center items-center'>
        <Button
          buttonWidth={Button.buttonWidth.ICON_ONLY}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
        >
          <ArrowDownSvg className={'rotate-90'} />
        </Button>
      </div>

      <div className='bg-aquamarine w-full h-full flex justify-center items-center'>
        <Image
          src={url}
          width='600'
          height={250}
          objectFit='contain'
          alt={description}>
        </Image>
      </div>

      <div className='bg-red w-[50px] h-full flex justify-center items-center'>
        <Button
          buttonWidth={Button.buttonWidth.ICON_ONLY}
          buttonBackground={Button.buttonBackground.BLUE}
          labelColour={Button.labelColour.WHITE}
        >
          <ArrowDownSvg className={'-rotate-90'} />
        </Button>
      </div>
    </div>
  )

  const renderAssetDetails = () => {

    const filenameArray = url.split('/')
    const filename = filenameArray[filenameArray.length - 1]
    return (
      <div>
        <div className='flex justify-between'>
          <span className='font-heading-7'>Dimensions</span>
          <span className='font-body-3'>1312 x 600</span>
        </div>
        {/* <div className='flex justify-between'>
        <span className='font-heading-7'>Size</span>
        <span className='font-body-3'>49 KB</span>
      </div> */}
        <div className='flex justify-between'>
          <span className='font-heading-7'>Filetype</span>
          <span className='font-body-3'>{encoding.toLocaleUpperCase()}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-heading-7'>Filename</span>
          <span className='font-body-3'>{filename}</span>
        </div>
      </div>
    ) }

  const renderJSON = () => (
    <pre className='dark: text-grey-100'>
      <code>test</code>
      <code>test</code>
      <code>test</code>
      <code>test</code>
    </pre>
  )

  const renderButtons = () => (
    <div className='flex justify-end gap-[20px]'>
      <Button
        handleClick={() => console.log('clicked')}
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      > <SearchSvg/>View in Django
      </Button>
      <Button
        handleClick={() => console.log('clicked')}
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      > <SearchSvg/>Download
      </Button>
    </div>
  )


  return (
    <Modal modalHeader={`${type} Asset ${id}`}>
      {renderEnvironmentTags()}
      {renderImageSection()}
      {renderAssetDetails()}
      {renderJSON()}
      {renderButtons()}
    </Modal>
  )
}

export default AssetModal
