type Props = {
  sectionClass: string,
}

const Typography = ({sectionClass}: Props) => {

  const descriptionClass = 'text-lg font-heading font-normal text-grey-500 dark:text-grey-500'

  return (
    <section className={sectionClass}>
      <h2 className='font-heading-3'>Typography</h2>
      <div className='w-1/2 min-w-[1000px] grid gap-12 grid-cols-2'>
        <div>
          <div className='grid grid-cols-2 mb-12 items-center'>
            <p className='text-[6.25rem] font-heading text-grey-900 dark:text-grey-100'>Aa</p>
            <div className='border-l-2 border-grey-500 pl-10'>
              <h3 className='font-heading-7'>PRIMARY FONT</h3>
              <p className='font-heading-4 text-[2rem]'>Poppins</p>
            </div>
          </div>
          <p className='font-heading text-xl font-medium text-grey-600 dark:text-grey-600 mb-16'>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz<br/>0123456789</p>
          <div>
            <div>
              <h4 className='font-heading-6 text-grey-600'>HEADING</h4>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-0'>H0</p>
              <p className= {descriptionClass}>Bold - 56px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-1'>H1</p>
              <p className={descriptionClass}>Semibold - 48px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-2'>H2</p>
              <p className={descriptionClass}>Semibold - 36px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-3'>H3</p>
              <p className={descriptionClass}>Semibold - 28px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-4'>H4</p>
              <p className={descriptionClass}>Semibold - 24px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-5'>H5</p>
              <p className={descriptionClass}>Semibold - 18px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-6'>H6</p>
              <p className={descriptionClass}>Semibold - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <h4 className='font-heading-6 text-grey-600'>H6 Title</h4>
              <p className={descriptionClass}>Semibold - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-6 font-medium'>H6</p>
              <p className={descriptionClass}>Medium - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-7'>H7</p>
              <p className={descriptionClass}>Semibold - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-7 font-medium'>H7</p>
              <p className={descriptionClass}>Medium - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-7 line-through'>H7</p>
              <p className={descriptionClass}>Semibold - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-8'>H8</p>
              <p className={descriptionClass}>Regular - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-9'>H9</p>
              <p className={descriptionClass}>Semibold - 12px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-9 font-medium'>H9</p>
              <p className={descriptionClass}>Medium - 12px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-heading-10'>H10</p>
              <p className={descriptionClass}>Semibold - 11px</p>
            </div>
          </div>
        </div>
        <div>

          <div className='grid grid-cols-2 mb-12 items-center'>
            <p className='text-[6.25rem] font-body text-grey-900 dark:text-grey-100'>Aa</p>
            <div className='border-l-2 border-grey-500 pl-10'>
              <h3 className='font-heading-7'>SECONDARY FONT</h3>
              <p className='font-body-1 text-[2rem]'>Roboto</p>
            </div>
          </div>
          <p className='font-body text-xl font-medium text-grey-600 dark:text-grey-600 mb-16'>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz<br/>0123456789</p>
          <div>
            <div>
              <h4 className='font-heading-6 text-grey-600'>BODY</h4>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-1'>Body 1</p>
              <p className={descriptionClass}>Regular - 18px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-1 font-medium'>Body 1</p>
              <p className={descriptionClass}>Medium - 18px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-2'>Body 2</p>
              <p className={descriptionClass}>Regular - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-2 line-through'>Body 2</p>
              <p className={descriptionClass}>Regular - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-2 font-medium'>Body 2</p>
              <p className={descriptionClass}>Medium - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-3'>Body 3</p>
              <p className={descriptionClass}>Regular - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-3 font-medium'>Body 3</p>
              <p className={descriptionClass}>Medium - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-3 font-bold'>Body 3</p>
              <p className={descriptionClass}>Bold - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-4'>Body 4</p>
              <p className={descriptionClass}>Regular - 12px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-4 font-medium'>Body 4</p>
              <p className={descriptionClass}>Medium - 12px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-body-4 font-bold'>Body 4</p>
              <p className={descriptionClass}>Bold - 12px</p>
            </div>
            <div className='pt-16 pb-12'>
              <h4 className='font-heading-6 text-grey-600'>SUBHEADING</h4>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-1'>Subheading 1</p>
              <p className={descriptionClass}>Regular - 18px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-1 font-medium'>Subheading 1</p>
              <p className={descriptionClass}>Medium - 18px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-2'>Subheading 2</p>
              <p className={descriptionClass}>Regular - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-2 font-medium'>Subheading 2</p>
              <p className={descriptionClass}>Medium - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-2 line-through'>Subheading 2</p>
              <p className={descriptionClass}>Regular - 16px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-3'>Subheading 3</p>
              <p className={descriptionClass}>Regular - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-3 font-medium'>Subheading 3</p>
              <p className={descriptionClass}>Medium - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-3 line-through'>Subheading 3</p>
              <p className={descriptionClass}>Regular - 14px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-4'>Subheading 4</p>
              <p className={descriptionClass}>Regular - 12px</p>
            </div>
            <div className='grid grid-cols-2 pt-8 items-center'>
              <p className='font-subheading-4 font-medium'>Subheading 4</p>
              <p className={descriptionClass}>Medium - 12px</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Typography
