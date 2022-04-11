import type {NextPage} from 'next'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {PageLayout} from 'components'

const MerchantPage: NextPage = () => {
  const router = useRouter()
  const {planId, merchantId, tab, ref} = router.query

  const tabPath = `/mid-management/directory/${planId}/${merchantId}?tab=`

  return (
    <PageLayout>
      <h3 className='font-heading-3 mb-[5px]'>Merchant Page</h3>
      <p className='font-subheading-2 mb-[39px]'>This page will show the Merchant with the ID: {merchantId} with PlanId: {planId}.</p>
      <p className='font-subheading-2 mb-[39px]'>Current Tab: {tab}</p>
      <p className='font-subheading-2 mb-[39px]'>Current Ref: {ref}</p>


      <h4 className='font-heading-5'>Test Tab Switching</h4>
      <ul className='list-disc'>
        <li><Link href={`${tabPath}mids`}>MIDS</Link></li>
        <li><Link href={`${tabPath}locations`}>Locations</Link></li>
        <li><Link href={`${tabPath}identifiers`}>Identifiers</Link></li>
        <li><Link href={`${tabPath}secondary-mids`}>Secondary MIDs</Link></li>
      </ul>
    </PageLayout>
  )
}

export default MerchantPage


