
export default function DesignSystem() {

  const renderSwatches = () => ( // Temporary implementation to avoid class purging. Will be resolved when actually using those colours. Might be a way to get from tailwinds config.
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

  const sectionClass: string = 'm-10 w-[600px] bg-outlineGrey/25 shadow-md p-8'
  const sectionHeaderClass: string = 'font-bold text-4xl text-center'

  return (
    <div>
        <h1 className='text-4xl font-bold'>Design System</h1>

        <section className={sectionClass}>
          <h2 className={sectionHeaderClass}>Colour Palette</h2>
          <div className='w-max grid gap-4 grid-cols-4 auto-rows-auto'> 
            {renderSwatches()}
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionHeaderClass}>Font</h2>
          <p>Nunito Sans - The quick brown fox jumps over the lazy dog</p>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionHeaderClass}>Font Weight</h2>
           <ul className='list-disc'>
            <li className='font-light'>Light - 300</li>
            <li className='font-semibold'>Semibold - 600</li>
            <li className='font-bold'>Bold - 700</li>
            <li className='font-extrabold'>Extrabold - 800 (where is this used in design?)</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionHeaderClass}>Font Types</h2>
           <ul className='list-disc'>
            <li><h1 className='text-4xl font-bold'>Headline element - 33px</h1></li>
            <li><h2 className='font-semibold text-binkGrey'>Subtitle - 16px</h2></li>
            <li><p className='font-light'>Body text - 16px</p></li>
            <li><p>Label text - 16px</p></li>
            <li><h2 className='font-semibold text-binkGrey'>Sidebar title - 16px</h2></li>
            <li><a href='bink.com' className='text-binkGreen'>Hyperlink - 16px</a></li>
            <li><a href='bink.com'>Visited Hyperlink</a></li>
            <li><p className='text-sm text-invalidRed'>This is error text - 14pt</p></li>
          </ul>
        </section>

        <section className={sectionClass}>
        <h2 className={sectionHeaderClass}>Maybe a button?</h2>
        </section>
    </div>
  )
}
