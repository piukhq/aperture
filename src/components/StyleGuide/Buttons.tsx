import {Button} from 'components'
import WriteSvg from 'icons/svgs/write.svg'
import PlusSvg from 'icons/svgs/plus.svg'
import TrashSvg from 'icons/svgs/trash.svg'
import SettingsSvg from 'icons/svgs/settings.svg'
import {ButtonWidth, ButtonSize, ButtonBackground, BorderColour, LabelColour, LabelWeight} from 'components/Button/styles'

type Props = {
  sectionClass: string,
}

const Buttons = ({sectionClass}: Props) => {
  return (
    <section className={sectionClass}>
      <h2 className='font-heading-3'>Buttons</h2>
      <div className='grid grid-cols-2 gap-4 pt-4 items-center'>
        <div className='flex flex-col'>
          <h4 className='font-heading-6 text-grey-600'>PRIMARY</h4>
          <div className='pb-8'>
            <div className='flex gap-2 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.WHITE}
                labelColour={LabelColour.BLUE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                borderColour={BorderColour.BLUE}
                labelColour={LabelColour.BLUE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Primary Button
              </Button>
            </div>
            <Button
              handleClick={() => console.log('clicked')}
              buttonSize={ButtonSize.MEDIUM}
              buttonWidth={ButtonWidth.FULL}
              buttonBackground={ButtonBackground.BLUE}
              labelColour={LabelColour.WHITE}
              labelWeight={LabelWeight.SEMIBOLD}
            > Primary Button
            </Button>
          </div>
          <div className='pb-8'>
            <h4 className='font-heading-6 text-grey-600'>SECONDARY</h4>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                borderColour={BorderColour.RED}
                labelColour={LabelColour.RED}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.DARK_GREY}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
            </div>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.WHITE}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM_BODY_FONT}
                buttonWidth={ButtonWidth.MEDIUM}
                borderColour={BorderColour.GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.REGULAR}
              > Secondary
              </Button>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <h4 className='font-heading-6 text-grey-600'>SMALL PRIMARY</h4>
          <div className='pb-8'>
            <div className='flex gap-2 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.WHITE}
                labelColour={LabelColour.BLUE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                borderColour={BorderColour.BLUE}
                labelColour={LabelColour.BLUE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Primary Button
              </Button>
            </div>
            <Button
              handleClick={() => console.log('clicked')}
              buttonSize={ButtonSize.SMALL}
              buttonWidth={ButtonWidth.FULL}
              buttonBackground={ButtonBackground.BLUE}
              labelColour={LabelColour.WHITE}
              labelWeight={LabelWeight.SEMIBOLD}
            > Primary Button
            </Button>
          </div>
          <div className='pb-8'>
            <h4 className='font-heading-6 text-grey-600'>SMALL SECONDARY</h4>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                borderColour={BorderColour.RED}
                labelColour={LabelColour.RED}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.DARK_GREY}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
            </div>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.WHITE}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL}
                buttonWidth={ButtonWidth.MEDIUM}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.GREY}
                labelWeight={LabelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.SMALL_BODY_FONT}
                buttonWidth={ButtonWidth.MEDIUM}
                borderColour={BorderColour.GREY}
                labelColour={LabelColour.LIGHT_GREY}
                labelWeight={LabelWeight.REGULAR}
              > Secondary
              </Button>
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          <h4 className='font-heading-6 text-grey-600'>WITH ICON [Some icons may differ as not found]</h4>
          <div className='pb-8'>
            <div className='flex gap-2 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.LARGE}
                buttonWidth={ButtonWidth.LARGE}
                buttonBackground={ButtonBackground.WHITE}
                labelColour={LabelColour.DARK_GREY}
              > <WriteSvg/> Write Message
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.ICON_TEXT}
                buttonBackground={ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
                labelWeight={LabelWeight.MEDIUM} // Visual match with Abstract over Semibold
              > <PlusSvg/> New
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.ICON_TEXT}
                buttonBackground={ButtonBackground.LIGHT_GREY}
                labelColour={LabelColour.DARK_GREY}
                labelWeight={LabelWeight.MEDIUM} // Visual match with Abstract over Semibold
              > <PlusSvg fill='#b5b5be'/> New
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.ICON_ONLY}
                buttonBackground={ButtonBackground.BLUE}
                labelColour={LabelColour.WHITE}
              ><SettingsSvg/>
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={ButtonSize.MEDIUM_ICON}
                buttonWidth={ButtonWidth.ICON_ONLY}
                borderColour={BorderColour.RED}
                labelColour={LabelColour.RED}
              ><TrashSvg className='fill-red' />
              </Button>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <h4 className='font-heading-6 text-grey-600'>TAG</h4>
          <div className='pb-8'>
            <div className='flex gap-2 py-4'>
              <div className='flex items-center justify-center h-[28px] px-6 bg-grey-200 font-heading text-grey-700 font-medium text-4xs rounded-[5px]'>Tag</div>
              <div className='flex items-center justify-center h-[28px] px-6 bg-grey-800 font-heading text-grey-100 font-regular text-4xs border border-grey-500 rounded-[5px]'>Tag</div>
              <div className='flex items-center justify-center h-[28px] px-6 bg-blue/10 font-heading text-blue font-regular text-4xs rounded-[5px]'>Tag</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Buttons
