import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {PageLayout} from 'components'


const MerchantPage: NextPage = () => {
  const router = useRouter()
  const {planId, merchantId} = router.query
  return (
    <PageLayout>
      <h3 className='font-heading-3 mb-[5px]'>Merchant</h3>
      <p className='font-subheading-2 mb-[39px]'>This page will show the Merchant with the ID: {merchantId} with PlanId: {planId}</p>
    </PageLayout>
  )
}

export default MerchantPage

// Check ticket for info on what the next endpoints should be....
