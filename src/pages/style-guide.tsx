import type {NextPage} from 'next'
import Colours from 'components/StyleGuide/Colours'
import Typography from 'components/StyleGuide/Typography'
import Buttons from 'components/StyleGuide/Buttons'
import FormElements from 'components/StyleGuide/FormElements'
import MenuElements from 'components/StyleGuide/MenuElements'
import TagsStatus from 'components/StyleGuide/TagsStatus'

const StyleGuidePage: NextPage = () => {
  const sectionClass = 'min-w-[1200px] w-full bg-grey-100 dark:bg-grey-850 p-12 flex flex-col gap-6 mb-12'

  return (
    <div className='m-4'>
      <h1 className='font-heading-0'>Style Guide</h1>
      <Colours sectionClass={sectionClass}/>
      <Typography sectionClass={sectionClass}/>
      <Buttons sectionClass={sectionClass}/>
      <FormElements sectionClass={sectionClass}/>
      <MenuElements sectionClass={sectionClass}/>
      <TagsStatus sectionClass={sectionClass}/>
    </div>
  )
}

export default StyleGuidePage
