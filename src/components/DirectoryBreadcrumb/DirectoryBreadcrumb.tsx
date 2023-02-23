import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useAppSelector} from 'app/hooks'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {useMidManagementPlans} from 'hooks/useMidManagementPlans'

const DirectoryBreadcrumb = () => {
  const router = useRouter()
  const {planId} = router.query

  const {
    getPlanResponse,
  } = useMidManagementPlans({
    skipGetPlans: true,
    planRef: planId as string,
  })

  // Split out '/' and '?' characters from route
  const currentRoute = router.asPath.split(/(?:\/|\?)+/).slice(2)

  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)

  const planDetailsList = getPlanResponse

  const getMerchantNameFromApi = () => {
    const merchantDetails = planDetailsList.merchants.find(merchant => merchant.merchant_ref === currentRoute[2])
    if (merchantDetails) {
      return merchantDetails.merchant_metadata.name
    }
    return ''
  }

  const getPlanName = () => selectedPlan.plan_metadata.name || planDetailsList.plan_metadata.name
  const getMerchantName = () => selectedMerchant.merchant_metadata.name || getMerchantNameFromApi()

  return (
    <div data-testid='directory-breadcrumb' className='font-subheading-6 text-blue mt-[15px] flex flex-row gap-[15px]'>
      <Link href={`/mid-management/${currentRoute[0]}`} passHref>
        <a>PLANS</a>
      </Link>

      {planDetailsList && (
        <>
          {currentRoute[1] && (
            <>
              <p className='cursor-default'>/</p>
              <Link href={`/mid-management/${currentRoute[0]}/${currentRoute[1]}`} passHref>
                <a>{getPlanName().toUpperCase()}</a>
              </Link>
            </>
          )}

          {currentRoute[2] && (
            <>
              <p className='cursor-default'>/</p>
              <Link href={`/mid-management/${currentRoute[0]}/${currentRoute[1]}/${currentRoute[2]}`} passHref>
                <a>{getMerchantName().toUpperCase()}</a>
              </Link>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default React.memo(DirectoryBreadcrumb)
