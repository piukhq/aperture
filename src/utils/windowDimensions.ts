import {RefObject, useEffect, useState} from 'react'
import debounce from 'just-debounce-it'

type WindowDimensions = {
  width: number
  height: number
}

export const getWindowDimensions = (): WindowDimensions | null => {
  if (typeof window !== 'undefined') { //Prevents server-side running
    const {innerWidth: width, innerHeight: height} = window
    return {
      width,
      height,
    }
  }

  return null
}

export const useIsElementBeyondRightViewportEdge = (element: RefObject<HTMLDivElement>, buffer: number) => {
  const [isBeyondEdge, setIsBeyondEdge] = useState<boolean>(false)
  const handleResize = () => {
    const windowDimensions = getWindowDimensions()
    windowDimensions && element?.current?.getBoundingClientRect() && setIsBeyondEdge(element?.current?.getBoundingClientRect()?.x > windowDimensions?.width - buffer)
  }

  const debouncedHandleResize = debounce(handleResize, 50)

  useEffect(() => {
    const windowDimensions = getWindowDimensions()
    windowDimensions && element?.current?.getBoundingClientRect() && setIsBeyondEdge(element?.current?.getBoundingClientRect().x > windowDimensions?.width - buffer)
  }, [element, buffer])

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  return isBeyondEdge
}

export const useIsMobileViewportDimensions = () => {
  const windowDimensions = getWindowDimensions()
  const [isMobileViewportDimensions, setIsMobileViewportDimensions] = useState<boolean>(windowDimensions ? windowDimensions.width <= 1000 : false)

  const handleResize = () => setIsMobileViewportDimensions(windowDimensions ? windowDimensions?.width <= 1000 : false)
  const debouncedHandleResize = debounce(handleResize, 50)

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  return isMobileViewportDimensions
}
