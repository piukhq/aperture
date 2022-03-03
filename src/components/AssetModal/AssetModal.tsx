import {useState, useMemo} from 'react'
import {Button, Modal, Tag} from 'components'
import Image from 'next/image'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'
import SearchWhiteSvg from 'icons/svgs/search-white.svg'
import DownloadSvg from 'icons/svgs/download.svg'

import {useAppSelector} from 'app/hooks'

import {getSelectedPlanAsset, getSelectedPlanAssetGroup} from 'features/planAssetsSlice'

const AssetModal = () => {
  const assetTypeNames = useMemo(() => ['Hero', 'Banner', 'Offers', 'Icon', 'Asset', 'Reference', 'Personal Offers', 'Promotions', 'Tier', 'Alt Hero'], [])

  const selectedAsset = useAppSelector(getSelectedPlanAsset)
  const selectedAssetGroup = useAppSelector(getSelectedPlanAssetGroup)
  const [imageDimensions, setImageDimensions] = useState(null)

  const imageClasses = imageDimensions ? 'opacity-100 transition-opacity' : 'opacity-25 transition-opacity'

  const {id, type, url, description, encoding, hasMultipleOfSameType, typeIndex} = selectedAsset

  const renderEnvironmentTags = () => {

    const blankTag = () => <div className='w-[24px]'></div>

    return (
      <div className='border-b-2 border-grey-500 mb-[24px]'>
        <h3 className='font-heading-9'>Environment</h3>
        <div className='flex gap-[8px] pt-[7px] mb-[24px]'>
          { selectedAssetGroup[0] ? <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.AQUAMARINE_FILLED} label='D' /> : blankTag()}
          { selectedAssetGroup[1] ? <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.YELLOW_FILLED} label='S' /> : blankTag()}
        </div>
      </div>
    ) }

  const renderImageSection = () => {
    const isSoleAsset = selectedAssetGroup.filter(env => env).length === 1

    const renderNavigationButton = rotation => (
      <Button
        buttonWidth={Button.buttonWidth.TINY}
        buttonSize={Button.buttonSize.TINY}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
      >
        <ArrowDownSvg fill='white' className={`${rotation} scale-75`} />
      </Button>
    )

    return (
      <div className='w-full h-[317px] flex mb-[24px]'>
        <div className='w-[50px] h-full flex items-center'>
          {!isSoleAsset && renderNavigationButton('rotate-90')}
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <Image
            className={imageClasses}
            src={url}
            width={520}
            height={317}
            objectFit='contain'
            alt={description}
            onLoadingComplete={(imageDimensions) => setImageDimensions(imageDimensions)}/>
        </div>
        <div className='w-[50px] h-full flex justify-end items-center'>
          {!isSoleAsset && renderNavigationButton('-rotate-90')}
        </div>
      </div>
    ) }

  const renderAssetDetails = () => {
    const filenameArray = url.split('/')
    const filename = filenameArray[filenameArray.length - 1]
    return (
      <div className='mb-[24px]'>
        <div className='flex justify-between mb-[2px]'>
          <span className='font-heading-7'>Dimensions</span>
          <span className='font-body-3'>{imageDimensions && `${imageDimensions.naturalWidth} x ${imageDimensions.naturalHeight}`}</span>
        </div>
        {/* <div className='flex justify-between mb-[2px]'>
          <span className='font-heading-7'>Size</span>
          <span className='font-body-3'>49 KB</span>
        </div> */}
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


  const renderJSON = () => {
    const JSONAsset = JSON.stringify(selectedAsset).split(/[,{}]+/)
    const codeBox = JSONAsset.map((line, index) => {
      let prefix = '  '
      if (index === 0) {
        prefix = '{'
      } else if (index === JSONAsset.length - 1) {
        prefix = '}'
      }
      return (
        <div key={index} className='bg-grey-400 flex flex-nowrap text-sm overflow-hidden'>
          <span className='bg-grey-500 w-[20px] text-center basis-[3%] shrink-0 text-grey-700 py-[3px]'>{index + 1}</span>
          <span className='text-left basis-[97%] text-grey-800 pl-[10px] py-[3px]'>{prefix} {line}</span>
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
        handleClick={() => console.log('clicked')}
        buttonSize={Button.buttonSize.MEDIUM_ICON}
        buttonWidth={Button.buttonWidth.AUTO}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
        labelWeight={Button.labelWeight.MEDIUM}
      > <SearchWhiteSvg />View in Django
      </Button>
      <Button
        handleClick={() => console.log('clicked')}
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
    <Modal modalHeader={`${assetTypeNames[type]} ${hasMultipleOfSameType ? typeIndex + 1 : ''} Asset ${id}`}>
      {renderEnvironmentTags()}
      {renderImageSection()}
      {renderAssetDetails()}
      {renderJSON()}
      {renderButtons()}
    </Modal>
  )
}

export default AssetModal
