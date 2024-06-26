import React from 'react'
import {useRouter} from 'next/router'
import useGetRouterQueryString from 'hooks/useGetRouterQueryString'
import Link from 'next/link'
import {useAppSelector} from 'app/hooks'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {useDirectoryPlans} from 'hooks/useDirectoryPlans'

const DirectoryBreadcrumb = () => {
  const router = useRouter()
  const {planId} = useGetRouterQueryString()

  const {
    getPlanResponse,
  } = useDirectoryPlans({
    skipGetPlans: true,
    planRef: planId,
  })

  // Split out '/' and '?' characters from route
  const currentRoute = router.asPath.split(/(?:\/|\?)+/).slice(2)

  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)

  const planDetailsList = getPlanResponse

  const getMerchantNameFromApi = () => {
    const merchantDetails = planDetailsList?.merchants.find(merchant => merchant.merchant_ref === currentRoute[2])
    if (merchantDetails) {
      return merchantDetails.merchant_metadata.name
    }
    return ''
  }

  const getPlanName = () => selectedPlan.plan_metadata.name || planDetailsList?.plan_metadata.name
  const getMerchantName = () => selectedMerchant?.merchant_metadata.name || getMerchantNameFromApi()

  return (
    <div data-testid='directory-breadcrumb' className='font-subheading-6 text-blue mt-[15px] flex flex-row gap-[15px]'>
      <Link href={`/mid-management/${currentRoute[0]}`} passHref>
        PLANS
      </Link>

      {planDetailsList && (
        <>
          {currentRoute[1] && (
            <>
              <p className='cursor-default'>/</p>
              <Link href={`/mid-management/${currentRoute[0]}/${currentRoute[1]}`} passHref>
                {getPlanName()?.toUpperCase()}
              </Link>
            </>
          )}

          {currentRoute[2] && (
            <>
              <p className='cursor-default'>/</p>
              <Link href={`/mid-management/${currentRoute[0]}/${currentRoute[1]}/${currentRoute[2]}`} passHref>
                {getMerchantName().toUpperCase()}
              </Link>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default React.memo(DirectoryBreadcrumb)
