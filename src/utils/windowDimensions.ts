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
}

export const useIsElementBeyondRightViewportEdge = (element: RefObject<HTMLDivElement>, buffer: number) => {
  const [isBeyondEdge, setIsBeyondEdge] = useState(false)
  const handleResize = () => setIsBeyondEdge(element?.current?.getBoundingClientRect().x > getWindowDimensions().width - buffer)
  const debouncedHandleResize = debounce(handleResize, 50)

  useEffect(() => {
    setIsBeyondEdge(element?.current?.getBoundingClientRect().x > getWindowDimensions().width - buffer)
  }, [element, buffer])

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  return isBeyondEdge
}

export const useIsMobileViewportDimensions = () => {
  const [isMobileViewportDimensions, setIsMobileViewportDimensions] = useState(true)

  const handleResize = () => setIsMobileViewportDimensions(getWindowDimensions().width <= 900)
  const debouncedHandleResize = debounce(handleResize, 50)


  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  return isMobileViewportDimensions
}
