import {
  Heading2,
  Heading5,
  Heading7Semibold,
  Heading7Medium,
} from 'components/Text'

import tailwindsConfig from '../../../tailwind.config' // TODO: Has to be a better way of getting above src folder

import {classNames} from 'utils/classNames'

export default function Colours ({sectionClass}) {
  const colours = tailwindsConfig.theme.colors

  function hexToRgb (hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null
  }

  const renderLargeSwatches = () => [
    'blue',
    'yellow',
    'lightBlue',
    'aquamarine',
  ].map(swatch => {
    return <div key={swatch} className={`bg-${swatch} w-[255px] h-[202px] rounded-[30px] p-8 flex flex-col gap-3`}>
      <Heading7Semibold>{colours[swatch].toUpperCase()} ({swatch})</Heading7Semibold>
      <Heading7Medium>R: {hexToRgb(colours[swatch]).r}</Heading7Medium>
      <Heading7Medium>G: {hexToRgb(colours[swatch]).g}</Heading7Medium>
      <Heading7Medium>B: {hexToRgb(colours[swatch]).b}</Heading7Medium>
    </div>
  })

  const renderMediumSwatches = () => [
    'bg-orange',
    'bg-red',
    'bg-green',
    'bg-purple',
    'bg-pink',
  ].map(background => {
    const swatch = background.split('-')[1]
    return <div key={swatch} className={`${background} w-[198px] h-[75px] rounded-[30px] flex items-center justify-center`}>
      <Heading5>{colours[swatch].toUpperCase()} ({swatch})</Heading5>
    </div>
  }
  )

  const renderSmallSwatches = () => {
    const swatchArray = [
      'bg-grey-950',
      'bg-grey-900',
      'bg-grey-850',
      'bg-grey-825',
      'bg-grey-800',
      'bg-grey-700',
      'bg-grey-600',
      'bg-grey-500',
      'bg-grey-400',
      'bg-grey-300',
      'bg-grey-200',
      'bg-grey-100',
    ]
    return swatchArray.map((background, index) => {
      const greyLevel = background.split('-')[2]
      const swatch = `grey-${greyLevel}`
      const hex = colours['grey'][greyLevel]
      const textStyle = index > 4 ? 'text-grey-900' : 'text-grey-300'
      return <div key={swatch} className={classNames(
        `${background} w-full h-[75px] ${textStyle} flex flex-col items-center justify-center ${index === 0 && 'rounded-l-[15px]'} ${index === swatchArray.length - 1 && 'rounded-r-[15px]'}`
      )}>
        <p className='font-heading font-semibold text-sm'>{hex}</p>
        <p className='font-heading font-semibold text-2xs'>({swatch})</p>
      </div>
    })
  }

  return (
    <section className={sectionClass}>
      <Heading2>Colours</Heading2>
      <div className='w-full grid gap-4 grid-cols-4'>
        {renderLargeSwatches()}
      </div>
      <div className='w-full grid gap-4 grid-cols-5'>
        {renderMediumSwatches()}
      </div>
      <div className='w-full grid grid-cols-12'>
        {renderSmallSwatches()}
      </div>
    </section>
  )
}
