import {useState} from 'react'
import Image from 'next/image'
import DotsSVG from 'icons/svgs/dots.svg'

export const Asset = ({description, url}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageSrc, setImageSrc] = useState(url)
  const [imageWidth, setImageWidth] = useState('150')
  const imageClasses = isLoaded ? 'opacity-100 transition-opacity' : 'opacity-25 transition-opacity'

  const handleError = () => {
    setImageSrc('/icons/svgs/asset-error.svg')
    setImageWidth('22')
  }
  return (
    <div>
      <Image
        className={imageClasses}
        alt={description}
        width={imageWidth}
        height='73'
        objectFit='contain'
        src={imageSrc}
        quality='25' // TODO: Revisit this once the hover zoom effect is in place
        placeholder='blur'
        blurDataURL={url}
        onLoadingComplete={() => setIsLoaded(true)}
        onError={handleError}
      />

      {!isLoaded && (
        <div className='w-full absolute inset-0 flex justify-center items-center dark:bg-grey-825 '>
          <DotsSVG className='animate-pulse' />
        </div>
      )}
    </div>
  )


}
