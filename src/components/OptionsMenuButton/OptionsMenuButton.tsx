import React, {useState, useRef} from 'react'
import DotsSvg from 'icons/svgs/dots.svg'
import {ButtonWidth, ButtonSize, BorderColour} from 'components/Button/styles'
import {Button, OptionsMenuItem} from 'components'
import {useIsElementBeyondRightViewportEdge} from 'utils/windowDimensions'

import {OptionsMenuItems} from 'types'


type Props = {
  optionsMenuItems: OptionsMenuItems
}

const OptionsMenuButton = ({optionsMenuItems}: Props) => {
  const buttonRef = useRef(null)
  const isElementBeyondRightViewportEdge = useIsElementBeyondRightViewportEdge(buttonRef, 280)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const renderMenuItems = () => {
    return optionsMenuItems.map(item => {
      const {clickHandler, icon, label, isRed} = item

      const handleItemClick = () => {
        setIsMenuOpen(false)
        clickHandler()
      }
      return <OptionsMenuItem key={label} handleClick={handleItemClick} icon={icon} label={label} isRed={isRed} />
    })
  }

  return (
    <div ref={buttonRef}>
      <Button
        handleClick={() => setIsMenuOpen(true)}
        buttonSize={ButtonSize.MEDIUM_ICON}
        buttonWidth={ButtonWidth.ICON_ONLY}
        borderColour={BorderColour.GREY}
        ariaLabel='Options'
      ><DotsSvg/>
      </Button>
      {isMenuOpen && (
        <>
          <div
            data-testid='options-menu'
            className={`flex flex-col gap-[10px] absolute rounded-[6px] border border-grey-200 dark:border-grey-800
         translate-y-[-40px] p-[15px] h-max w-max bg-white dark:bg-grey-850 justify-center z-40 shadow-[0_1px_5px_0px_rgba(0,0,0,0.4)]
         ${isElementBeyondRightViewportEdge ? 'translate-x-[-230px]' : 'translate-x-[50px]'}  `}>
            {renderMenuItems()}
          </div>
          <div className={`absolute h-[15px] w-[15px] bg-white dark:bg-grey-850 transform origin-top-left top-[20px] z-40
          shadow-[-2px_-2px_3px_0px_rgba(0,0,0,0.15)] dark:shadow-[-1px_-1px_1px_0px_rgb(68,68,79)]
          ${isElementBeyondRightViewportEdge ? 'rotate-[135deg] right-[27px]' : 'rotate-[-45deg] right-[-17px]'}`}></div>
          <div className='fixed inset-0 z-30' onClick={() => setIsMenuOpen(false)} />
        </>
      )}
    </div>
  )
}

export default OptionsMenuButton
