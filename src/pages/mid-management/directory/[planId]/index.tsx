import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {PageLayout} from 'components'


const PlanPage: NextPage = () => {
  const router = useRouter()
  const {planId} = router.query
  return (

    <PageLayout>
      <h3 className='font-heading-3 mb-[5px]'>Plan Page</h3>
      <p className='font-subheading-2 mb-[39px]'>This page will show all Merchants for Plan Id: {planId} </p>
    </PageLayout>

  )
}

export default PlanPage
