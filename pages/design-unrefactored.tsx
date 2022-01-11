// Initial version which was refactored to avoid duplication below.

import Image from 'next/image' 

export default function DesignSystem() { // TODO: Refactor into components as needed. Wanted to show the actual JSX without abstraction into components for discussion/agreement on how to do that. 

  const renderSwatches = () => ( // Weird 'bug' to do with class purging. Tailwinds removes unused classes at Build. If you build a class dynamically ('bg-' + {swatch}) it doesn't recognize it as a real class and is removed.  Might be a way to get values from tailwinds config directly.
    ['bg-binkGreen', 
    'bg-primaryGreen',
    'bg-binkGrey',
    'bg-white',
    'bg-toolBg',
    'bg-outlineGrey',
    'bg-invalidRed',
    'bg-envDevFg',
    'bg-envStagingFg',
    'bg-envSandboxFg',
    'bg-envProdFg',
    'bg-envDevBg',
    'bg-envStagingBg',
    'bg-envSandboxBg',
    'bg-envProdBg',
    ].map( swatch => (
      <div key={swatch} className='w-full rounded border-2 border-black m-1 flex-column'>
        <div className={`${swatch} w-full h-24`}></div>
        <div className='text-center'>{swatch.split('-')[1]}</div>
      </div>
    ))
  )

  const sectionClass: string = 'm-10 w-148 bg-outlineGrey/25 shadow-md p-8 flex flex-col gap-8'
  const sectionHeaderClass: string = 'font-bold text-4xl text-center'

  return (
    <div className='m-4'>
        <h1 className='text-4xl font-bold'>Design System</h1>
        <p className='font-light'>This is the equivalent to the Typography page for Bink Web. A singular place to look at initial UI Elements and consider how best to manage them for features. </p>

        <section className={sectionClass}>
          <h2 className={sectionHeaderClass}>Colour Palette</h2>
          <div className='w-max grid gap-4 grid-cols-4 auto-rows-auto'> 
            {renderSwatches()}
          </div>
        </section>

        <section className={sectionClass}>
          <div>
            <h2 className={sectionHeaderClass}>Typography</h2>
            <h3 className='font-semibold text-binkGrey'>Font</h3>
            <p className='font-light'>Nunito Sans - The quick brown fox jumps over the lazy dog</p>
          </div>
          <div>
            <h3 className='font-semibold text-binkGrey'>Weights</h3>
            <ul className='list-disc'>
              <li className='font-light'>Light - 300</li>
              <li className='font-semibold'>Semibold - 600</li>
              <li className='font-bold'>Bold - 700</li>
              <li className='font-extrabold'>Extrabold - 800 (where is this used in design?)</li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold text-binkGrey'>Styles</h3>
            <ul className='list-disc'>
              <li><h1 className='text-4xl font-bold'>Headline element - 33px - Bold</h1></li>
              <li><h2 className='font-semibold text-binkGrey'>Subtitle - 16px - Semibold</h2></li>
              <li><p className='font-light'>Body text - 16px - Light</p></li>
              <li><p>Label text - 16px - Regular</p></li>
              <li><h2 className='font-semibold text-binkGrey'>Sidebar title - 16px - Semibold</h2></li>
              <li><a href='bink.com' className='text-binkGreen'>Hyperlink - 16px - Regular</a></li>
              <li><a href='bink.com'>Visited Hyperlink (not currently specified)</a></li>
              <li><p className='text-sm text-invalidRed'>This is error text - 14pt - Regular</p></li>
            </ul>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionHeaderClass}>Buttons</h2>
          <p className='font-light'>Could be a Button component as per Bink Web with different styles as shown below:</p>
          <dl className='flex flex-col gap-2'> 
            <dt className='font-semibold text-binkGrey'>Large</dt>
            <dd><button className='w-112 h-12 bg-primaryGreen text-white rounded-md'>View In Django</button></dd>
            <dt className='font-semibold text-binkGrey'>Small</dt>
            <dd><button className='w-32 h-12 bg-primaryGreen text-white rounded-md'>Load assets</button></dd>
            <dt className='font-semibold text-binkGrey'>Icon</dt>
            <dd><button className='w-12 h-12 bg-primaryGreen text-white rounded-md pt-2'><Image src='/images/refresh.png'alt='' height='20' width='27' /></button> </dd>
            <dt className='font-semibold text-binkGrey'>Circular</dt>
            <dd><button className='w-12 h-12 pt-2 pl-1 border-2 border-outlineGrey bg-white rounded-full'><Image src='/images/left-chevron.png' alt='left' width='25' height='25'/></button></dd>
            <dd><button className='w-12 h-12 pt-2 pl-1 border-2 border-outlineGrey bg-white rounded-full rotate-180'><Image src='/images/left-chevron.png' alt='left' width='25' height='25'/></button></dd>
            <dt className='font-semibold text-binkGrey'>Navigation Menu Item</dt>
            <dd>
              <button className='flex justify-start items-center w-60 h-12 bg-primaryGreen/12 text-primaryGreen font-semibold rounded-xl'>
                <span className='px-3 pt-2'><Image src='/images/menu-assets.png'alt='' height='18' width='23' /></span><span>Asset comparator</span>
              </button>
            </dd>
            <dt className='font-semibold text-binkGrey'>Environment Selection Buttons</dt>
            <dd className='flex flex-col gap-1'>
              <button className='w-7 h-7 bg-envDevBg text-envDevFg leading-7 border border-envDevFg rounded-md font-bold'>D</button> 
              <button className='w-7 h-7 bg-envStagingBg text-envStagingFg leading-7 border border-envStagingFg rounded-md font-bold'>S</button> 
              <button className='w-7 h-7 bg-envSandboxBg text-envSandboxFg leading-7 border border-envSandboxFg rounded-md font-bold'>S</button> 
              <button className='w-7 h-7 bg-envProdBg text-envProdFg leading-7 border border-envProdFg rounded-md font-bold'>P</button> 
            </dd>
          </dl>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionHeaderClass}>Environment Labels</h2>
          <p className='font-light'>Not intended to be buttons:</p>
          <ul className='flex flex-col gap-2'>
            <li><div className='w-52 h-7 bg-envDevBg text-envDevFg leading-7 border border-envDevFg rounded-md text-center font-bold'>DEVELOPMENT</div></li>
            <li><div className='w-52 h-7 bg-envStagingBg text-envStagingFg leading-7 border border-envStagingFg rounded-md text-center font-bold'>STAGING</div></li>
            <li><div className='w-52 h-7 bg-envSandboxBg text-envSandboxFg leading-7 border border-envSandboxFg rounded-md text-center font-bold'>SANDBOX</div></li>
            <li><div className='w-52 h-7 bg-envProdBg text-envProdFg leading-7 border border-envProdFg rounded-md text-center font-bold'>PRODUCTION</div></li>
          </ul>
        </section>
    </div>
  )
}
