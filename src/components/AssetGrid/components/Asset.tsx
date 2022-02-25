import {useState} from 'react'
import Image from 'next/image'
import DotsSVG from 'icons/svgs/dots.svg'

export const Asset = ({description, url}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imageClasses = isLoaded ? 'opacity-100 transition-opacity' : 'opacity-25 transition-opacity'

  return (
    <div>
      <Image
        className={imageClasses}
        alt={description}
        width='150'
        height='73'
        objectFit='contain'
        src={url}
        quality='25' // TODO: Revisit this once the hover zoom effect is in place
        placeholder='blur'
        blurDataURL={url}
        onLoadingComplete={() => setIsLoaded(true)}
      />

      {!isLoaded && (
        <div className='w-full absolute inset-0 flex justify-center items-center dark:bg-grey-825 '>
          <DotsSVG className='animate-pulse' />
        </div>
      )}
    </div>
  )


}
