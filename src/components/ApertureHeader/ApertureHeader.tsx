import ApertureSVG from 'icons/svgs/aperture-logo-large.svg'

const ApertureHeader = () => (
  <div className='flex justify-center items-center  h-96'>
    <div className={'z-10'}>
      <div className='scale-[50%] translate-x-24 skew-x-12 opacity-70 transform-gpu'>
        <ApertureSVG className={'animate-spin-30s fill-orange'} />
      </div>
    </div>
    <h1 className='font-heading-1 -skew-x-12 text-[5rem] z-30 uppercase -translate-x-24 ml-3'>Aperture</h1>
  </div>
)

export default ApertureHeader
