import {Button, Modal, Tag} from 'components'
import ArrowDownSvg from 'icons/svgs/arrow-down.svg'

// const selectedAsset = {
//   id: 632,
//   type: 0,
//   url: 'https://api.dev.gb.bink.com/content/media/hermes/schemes/Wasabi_Card.png',
//   description: 'Wasabi Hero',
//   encoding: 'png',
// }


const AssetModal = () => {

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
    <div className='w-full h-[400px] bg-grey-600'>
      <div className=''>

      </div>
      <Button
        buttonWidth={Button.buttonWidth.ICON_ONLY}
        buttonBackground={Button.buttonBackground.BLUE}
        labelColour={Button.labelColour.WHITE}
      > <ArrowDownSvg className={'rotate-90'} /></Button>

    </div>
  )


  return (
    <Modal modalHeader='<Asset_Type> Asset <Asset_ID>'>
      {renderEnvironmentTags()}
      {renderImageSection()}

    </Modal>
  )
}

export default AssetModal
