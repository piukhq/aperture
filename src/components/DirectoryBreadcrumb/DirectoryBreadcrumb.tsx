import React from 'react'
import {useRouter} from 'next/router'
import {useAppSelector} from 'app/hooks'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {mockPlanData} from 'utils/mockPlanData'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'

const DirectoryBreadcrumb = () => {
  const router = useRouter()

  // Split out '/' and '?' characters from route
  const currentRoute = router.asPath.split(/(?:\/|\?)+/).slice(2)

  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)

  const planList = mockPlanData
  const planDetailsList = mockPlanDetailsData

  // TODO: Should get these plan and merchant names from the api response if not available
  const getPlanNameFromApi = () => {
    const plan = planList.find(plan => plan.plan_ref === currentRoute[1])
    if (plan) {
      return plan.plan_metadata.name
    }
    return ''
  }

  const getMerchantNameFromApi = () => {
    const merchantDetails = planDetailsList.merchants.find(merchant => merchant.merchant.merchant_ref === currentRoute[2])
    if (merchantDetails) {
      return merchantDetails.merchant.merchant_metadata.name
    }
    return ''
  }

  const getPlanName = () => selectedPlan.plan_metadata.name || getPlanNameFromApi()
  const getMerchantName = () => selectedMerchant.merchant_metadata.name || getMerchantNameFromApi()

  return (
    <div className='font-subheading-6 text-blue mt-[15px] flex flex-row gap-[15px]'>
      <a href={`/mid-management/${currentRoute[0]}`}>PLANS</a>

      {currentRoute[1] && (
        <>
          <p className='cursor-default'>/</p>
          <a href={`/mid-management/${currentRoute[0]}/${currentRoute[1]}`}>{getPlanName().toUpperCase()}</a>
        </>
      )}

      {currentRoute[2] && (
        <>
          <p className='cursor-default'>/</p>
          <a href={`/mid-management/${currentRoute[0]}/${currentRoute[1]}/${currentRoute[2]}`}>{getMerchantName().toUpperCase()}</a>
        </>
      )}
    </div>
  )
}

export default React.memo(DirectoryBreadcrumb)
