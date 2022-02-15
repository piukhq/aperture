import Button from 'components/Button'
import WriteSvg from 'icons/svgs/write.svg'
import PlusSvg from 'icons/svgs/plus.svg'
import TrashSvg from 'icons/svgs/trash.svg'
import SettingsSvg from 'icons/svgs/settings.svg'

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
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.BLUE}
                labelColour={Button.labelColour.WHITE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.WHITE}
                labelColour={Button.labelColour.BLUE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                borderColour={Button.borderColour.BLUE}
                labelColour={Button.labelColour.BLUE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
            </div>
            <Button
              handleClick={() => console.log('clicked')}
              buttonSize={Button.buttonSize.MEDIUM}
              buttonWidth={Button.buttonWidth.FULL}
              buttonBackground={Button.buttonBackground.BLUE}
              labelColour={Button.labelColour.WHITE}
              labelWeight={Button.labelWeight.SEMIBOLD}
            > Primary Button
            </Button>
          </div>
          <div className='pb-8'>
            <h4 className='font-heading-6 text-grey-600'>SECONDARY</h4>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                borderColour={Button.borderColour.RED}
                labelColour={Button.labelColour.RED}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.DARK_GREY}
                labelColour={Button.labelColour.WHITE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.LIGHT_GREY}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
            </div>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.LIGHT_GREY}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.WHITE}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.LIGHT_GREY}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM_BODY_FONT}
                buttonWidth={Button.buttonWidth.MEDIUM}
                borderColour={Button.borderColour.GREY}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.REGULAR}
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
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.BLUE}
                labelColour={Button.labelColour.WHITE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.WHITE}
                labelColour={Button.labelColour.BLUE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                borderColour={Button.borderColour.BLUE}
                labelColour={Button.labelColour.BLUE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Primary Button
              </Button>
            </div>
            <Button
              handleClick={() => console.log('clicked')}
              buttonSize={Button.buttonSize.SMALL}
              buttonWidth={Button.buttonWidth.FULL}
              buttonBackground={Button.buttonBackground.BLUE}
              labelColour={Button.labelColour.WHITE}
              labelWeight={Button.labelWeight.SEMIBOLD}
            > Primary Button
            </Button>
          </div>
          <div className='pb-8'>
            <h4 className='font-heading-6 text-grey-600'>SMALL SECONDARY</h4>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                borderColour={Button.borderColour.RED}
                labelColour={Button.labelColour.RED}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.DARK_GREY}
                labelColour={Button.labelColour.WHITE}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.LIGHT_GREY}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
            </div>
            <div className='flex gap-4 py-4'>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.LIGHT_GREY}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.SEMIBOLD}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.WHITE}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL}
                buttonWidth={Button.buttonWidth.MEDIUM}
                buttonBackground={Button.buttonBackground.LIGHT_GREY}
                labelColour={Button.labelColour.GREY}
                labelWeight={Button.labelWeight.MEDIUM}
              > Secondary
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.SMALL_BODY_FONT}
                buttonWidth={Button.buttonWidth.MEDIUM}
                borderColour={Button.borderColour.GREY}
                labelColour={Button.labelColour.LIGHT_GREY}
                labelWeight={Button.labelWeight.REGULAR}
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
                buttonSize={Button.buttonSize.LARGE}
                buttonWidth={Button.buttonWidth.LARGE}
                buttonBackground={Button.buttonBackground.WHITE}
                labelColour={Button.labelColour.DARK_GREY}
              > <WriteSvg/> Write Message
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM_ICON}
                buttonWidth={Button.buttonWidth.ICON_TEXT}
                buttonBackground={Button.buttonBackground.BLUE}
                labelColour={Button.labelColour.WHITE}
                labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
              > <PlusSvg/> New
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM_ICON}
                buttonWidth={Button.buttonWidth.ICON_TEXT}
                buttonBackground={Button.buttonBackground.LIGHT_GREY}
                labelColour={Button.labelColour.DARK_GREY}
                labelWeight={Button.labelWeight.MEDIUM} // Visual match with Abstract over Semibold
              > <PlusSvg fill='#b5b5be'/> New
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM_ICON}
                buttonWidth={Button.buttonWidth.ICON_ONLY}
                buttonBackground={Button.buttonBackground.BLUE}
                labelColour={Button.labelColour.WHITE}
              ><SettingsSvg/>
              </Button>
              <Button
                handleClick={() => console.log('clicked')}
                buttonSize={Button.buttonSize.MEDIUM_ICON}
                buttonWidth={Button.buttonWidth.ICON_ONLY}
                borderColour={Button.borderColour.RED}
                labelColour={Button.labelColour.RED}
              ><TrashSvg/>
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
