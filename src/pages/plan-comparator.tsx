import type {NextPage} from 'next'
import Image from 'next/image'
import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'

const PlanComparatorPage: NextPage = () => {
  return (
    <PageLayout>
      <ContentTile>
        <Image src='/icons/svgs/construction.svg' height={200} width={200} alt='' />
        <h1 className='font-heading-1'>Page under construction!</h1>
      </ContentTile>
    </PageLayout>
  )
}

export default PlanComparatorPage
