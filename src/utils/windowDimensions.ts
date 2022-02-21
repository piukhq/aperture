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
