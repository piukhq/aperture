import {useState} from 'react'
import {Button, Modal, Tag} from 'components'
import Image from 'next/image'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import SearchWhiteSvg from 'icons/svgs/search-white.svg'
import DownloadSvg from 'icons/svgs/download.svg'

import {useAppSelector} from 'app/hooks'
import {EnvironmentIndex} from 'utils/enums'

import {getSelectedAssetId, getSelectedAssetGroup} from 'features/planAssetsSlice'
import {PlanAsset} from 'types'

const AssetModal = () => {
  const [imageDimensions, setImageDimensions] = useState(null)
  const imageClasses = imageDimensions ? 'opacity-100 transition-opacity' : 'opacity-25 transition-opacity'

  const selectedAssetId = useAppSelector(getSelectedAssetId)
  const selectedAssetGroup = useAppSelector(getSelectedAssetGroup)
  const assetEnvironments = Object.values(selectedAssetGroup)

  const selectedAsset:PlanAsset = assetEnvironments.find(env => env?.image?.id === selectedAssetId) // Determine which of the group to be displayed

  const {hasMultipleImagesOfThisType, typeIndex, image, heading} = selectedAsset
  const {id, url, description, encoding} = image


  const renderEnvironmentTags = () => {
    const renderNoTag = () => <div className='w-[12px]'></div>

    return (
      <div className='mb-[12px]'>
        <h3 className='font-heading-9'>Environment</h3>
        <div className='flex gap-[8px] pt-[7px] mb-[12px]'>
          {selectedAssetGroup[EnvironmentIndex.DEV] ? <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.AQUAMARINE_FILLED} label='D' /> : renderNoTag()}
          {selectedAssetGroup[EnvironmentIndex.STAGING] ? <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.YELLOW_FILLED} label='S' /> : renderNoTag()}
        </div>
      </div>
    ) }

  const renderImageSection = () => {
    const isUniqueAcrossEnvironments = Object.values(selectedAssetGroup).filter(env => env?.image?.id).length === 1
    const renderNavigationButton = rotation => (
      <Button
        handleClick={() => console.log('clicked')} // TODO: Placeholder for future ticket
        buttonWidth={Button.buttonWidth.TINY}
        buttonSize={Button.buttonSize.TINY}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
      >
        <ArrowDownSvg fill='white' className={`${rotation} scale-75`} />
      </Button>
    )

    return (
      <div className='w-full h-[280px] flex mb-[12px]'>
        <div className='w-[50px] h-full flex items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton('rotate-90')}
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <Image
            className={imageClasses}
            src={url}
            width={520}
            height={280}
            objectFit='contain'
            alt={description || heading}
            onLoadingComplete={(imageDimensions) => setImageDimensions(imageDimensions)}/>
        </div>
        <div className='w-[50px] h-full flex justify-end items-center'>
          {!isUniqueAcrossEnvironments && renderNavigationButton('-rotate-90')}
        </div>
      </div>
    ) }

  const renderAssetDetails = () => {
    const urlArray = url.split('/')
    const filename = urlArray[urlArray.length - 1]
    return (
      <div className='mb-[12px]'>
        <div className='flex justify-between mb-[2px]'>
          <span className='font-heading-7'>Dimensions</span>
          <span className='font-body-3'>{imageDimensions && `${imageDimensions.naturalWidth} x ${imageDimensions.naturalHeight}`}</span>
        </div>
        <div className='flex justify-between mb-[2px]'>
          <span className='font-heading-7'>Filetype</span>
          <span className='font-body-3'>{encoding.toLocaleUpperCase()}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-heading-7'>Filename</span>
          <span className='font-body-3'>{filename}</span>
        </div>
      </div>
    ) }


  const renderJSONSection = () => {
    const JSONImage = JSON.stringify(image).split(/[,{}]+/)
    const codeBox = JSONImage.map((line, index) => {
      let prefix = ' '
      if (index === 0) {
        prefix = '{'
      } else if (index === JSONImage.length - 1) {
        prefix = '}'
      }
      return (
        <div key={index} className='bg-grey-200 flex flex-nowrap overflow-hidden text-xs  text-grey-800'>
          <span className='bg-grey-300 w-[20px] text-center basis-[3%] shrink-0 py-[3px]'>{index + 1}</span>
          <span className='text-left basis-[97%] pl-[10px] py-[3px]'>{prefix} {line}</span>
        </div>
      ) })
    return (
      <pre className='text-grey-100 mb-[24px]'>
        {codeBox}
      </pre>
    )
  }

  const renderButtons = () => (
    <div className='flex justify-end gap-[20px] mb-[24px]'>
      <Button
        handleClick={() => console.log('clicked')} // TODO: Placeholder for future ticket
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      > <SearchWhiteSvg />View in Django
      </Button>
      <Button
        handleClick={() => console.log('clicked')} // TODO: Placeholder for future ticket
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      > <DownloadSvg/>Download
      </Button>
    </div>
  )

  return (
    <Modal modalHeader={`${heading} ${hasMultipleImagesOfThisType ? typeIndex + 1 : ''} Asset ${id}`}>
      {renderEnvironmentTags()}
      {renderImageSection()}
      {renderAssetDetails()}
      {renderJSONSection()}
      {renderButtons()}
    </Modal>
  )
}

export default AssetModal
