import {RefObject, useEffect, useState} from 'react'
import debounce from 'just-debounce-it'

export const getWindowDimensions = () => {
  if (typeof window !== 'undefined') { //Prevents server-side running
    const {innerWidth: width, innerHeight: height} = window
    return {
      width,
      height,
    }
  }
  return {
    width: 0,
    height: 0,
  }
}

export const useIsElementBeyondRightViewportEdge = (element: RefObject<HTMLDivElement>, buffer: number) => {
  const [isBeyondEdge, setIsBeyondEdge] = useState<boolean>(false)
  const handleResize = () => element.current && setIsBeyondEdge(element.current.getBoundingClientRect().x > getWindowDimensions().width - buffer)
  const debouncedHandleResize = debounce(handleResize, 50)

  useEffect(() => {
    if (element?.current?.getBoundingClientRect()) {
      setIsBeyondEdge(element?.current?.getBoundingClientRect().x > getWindowDimensions().width - buffer)
    }
  }, [element, buffer])

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  return isBeyondEdge
}

export const useIsMobileViewportDimensions = () => {
  const [isMobileViewportDimensions, setIsMobileViewportDimensions] = useState<boolean>(getWindowDimensions().width <= 1000)

  const handleResize = () => setIsMobileViewportDimensions(getWindowDimensions().width <= 1000)
  const debouncedHandleResize = debounce(handleResize, 50)

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  return isMobileViewportDimensions
}
