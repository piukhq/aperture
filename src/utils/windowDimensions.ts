import {useEffect, useState} from 'react'
import debounce from 'just-debounce-it'

const getWindowDimensions = () => {
  if (typeof window !== 'undefined') { //Prevents server-side running
    const {innerWidth: width, innerHeight: height} = window
    return {
      width,
      height,
    }
  }
}

const useCalculateWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  const [isDesktopViewportDimensions, setIsDesktopViewportDimensions] = useState(true)

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions())
  }

  const debouncedHandleResize = debounce(handleResize, 100)

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  useEffect(() => {
    setIsDesktopViewportDimensions(windowDimensions?.width >= 1000)
  }, [windowDimensions])

  return {windowDimensions, isDesktopViewportDimensions}
}

export {useCalculateWindowDimensions}
