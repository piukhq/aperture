import type {NextPage} from 'next'
import Image from 'next/image'
import ContentTile from 'components/ContentTile'
import PageLayout from 'components/PageLayout'
import {Heading1} from 'components/elements/Text'

const MidManagementPage: NextPage = () => {
  return (
    <PageLayout>
      <ContentTile>
        <Image src='/icons/svgs/construction.svg' height={200} width={200} alt='' />
        <Heading1>Page under construction!</Heading1>
      </ContentTile>
    </PageLayout>
  )
}

export default MidManagementPage
