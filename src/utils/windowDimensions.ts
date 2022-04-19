import {useEffect, useState} from 'react'
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

export const useIsElementBeyondRightViewportEdge = (element, buffer) => {
  const [isBeyondEdge, setIsBeyondEdge] = useState(false)

  const handleResize = () => setIsBeyondEdge(element.current.getBoundingClientRect().x > getWindowDimensions().width - buffer)
  const debouncedHandleResize = debounce(handleResize, 50)

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])


  return isBeyondEdge
}

export const useIsDesktopViewportDimensions = () => {
  const [isDesktopViewportDimensions, setIsDesktopViewportDimensions] = useState(true)

  const handleResize = () => setIsDesktopViewportDimensions(getWindowDimensions().width >= 1000)
  const debouncedHandleResize = debounce(handleResize, 50)


  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  return isDesktopViewportDimensions
}
