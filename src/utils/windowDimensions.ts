import {useEffect, useState} from 'react'
import debounce from 'just-debounce-it'

const getWindowDimensions = () => {
  if (typeof window !== 'undefined') {
    const {innerWidth: width, innerHeight: height} = window
    return {
      width,
      height,
    }
  }
}

const useCalculateWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions())
  }

  const debouncedHandleResize = debounce(handleResize, 100)

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize)
    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [debouncedHandleResize])

  const isDesktopViewportDimensions = windowDimensions?.width >= 1000
  return {windowDimensions, isDesktopViewportDimensions}
}

export {useCalculateWindowDimensions}
