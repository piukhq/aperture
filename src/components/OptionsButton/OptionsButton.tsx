import React, {useState, useRef, useEffect} from 'react'
import DotsSvg from 'icons/svgs/dots.svg'
import {ButtonWidth, ButtonSize, BorderColour} from 'components/Button/styles'
import {Button} from 'components'
import {getWindowDimensions} from 'utils/windowDimensions'

type Props = {
  children: React.ReactNode
}

const OptionsButton = ({children}: Props) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [leftSideMenu, setIsLeftSideMenu] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => { // use left side menu if component is >300px from viewport edge
    buttonRef?.current.getBoundingClientRect().x > getWindowDimensions().width - 300 ? setIsLeftSideMenu(true) : setIsLeftSideMenu(false)
  }, [buttonRef])

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
          <div className={`flex flex-col gap-[10px] absolute rounded-[6px] border border-grey-200 
         translate-y-[-40px] p-[15px] h-max w-max bg-white justify-center z-40 shadow-[0_1px_5px_0px_rgba(0,0,0,0.4)]
         ${leftSideMenu ? 'translate-x-[-230px]' : 'translate-x-[50px]'}  `}>
            {children}
          </div>
          <div className={`absolute h-[15px] w-[15px] bg-white transform origin-top-left top-[20px] z-50  shadow-[-2px_-2px_3px_0px_rgba(0,0,0,0.15)]
          ${leftSideMenu ? 'rotate-[135deg] right-[27px]' : 'rotate-[-45deg] right-[-17px]'}`}></div>
          <div className='fixed inset-0 z-30' onClick={() => setIsMenuOpen(false)} />
        </>
      )}
    </div>
  )
}

export default OptionsButton
