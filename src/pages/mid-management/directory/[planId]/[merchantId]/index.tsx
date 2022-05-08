import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {DirectoryMids} from 'types'
import {PageLayout, DirectoryDetailsHeader} from 'components'
import {mockMidsData} from 'utils/mockMidsData'
import {mockPlanDetailsData} from 'utils/mockPlanDetailsData'
import {getSelectedDirectoryMerchant} from 'features/directoryMerchantSlice'
import {getSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {useAppSelector} from 'app/hooks'
import AddVisaSvg from 'icons/svgs/add-visa.svg'
import AddMastercardSvg from 'icons/svgs/add-mastercard.svg'
import AddAmexSvg from 'icons/svgs/add-amex.svg'
import AmexSvg from 'icons/svgs/amex-logo-small.svg'
import MastercardSvg from 'icons/svgs/mastercard-logo-small.svg'
import VisaSvg from 'icons/svgs/visa-logo-small.svg'

const MerchantDetailsPage: NextPage = () => {
  const router = useRouter()
  const selectedPlan = useAppSelector(getSelectedDirectoryPlan)
  const selectedMerchant = useAppSelector(getSelectedDirectoryMerchant)
  const {merchantId} = router.query

  // const tabPath = (tab: string) => `/mid-management/directory/${planId}/${merchantId}?tab=${tab}` //TODO : Add navigation to other tabs?

  // TODO: Swap out for real api data
  const midsData: DirectoryMids = mockMidsData

  // TODO: placeholder logic instead of making API calls, probably will become utils.
  const getPlanDetails = () => {
    return mockPlanDetailsData
  }
  const getMerchant = () => {
    const merchant = mockPlanDetailsData.merchants.find(merchant => merchant.merchant.merchant_ref === merchantId)
    return merchant ? merchant : mockPlanDetailsData.merchants[0]
  }
  // If plan and merchant is known due to previous API calls use it, else hit the API to get them.
  const planDetails = selectedPlan.plan_ref ? selectedPlan : getPlanDetails()
  const merchant = selectedMerchant.merchant_ref ? selectedMerchant : getMerchant().merchant
  const {slug, plan_id: schemeId} = planDetails.plan_metadata
  const {name, icon_url: iconUrl, location_label: locationLabel} = merchant.merchant_metadata


  const renderMerchantDetailsSection = () => {
    const renderPaymentSchemeLogo = (index:number, paymentSchemeCode) => {
      const paymentSchemeArray = [<VisaSvg key={index}/>, <MastercardSvg key={index}/>, <AmexSvg key={index}/>]
      return paymentSchemeArray[paymentSchemeCode - 1]
    }

    const renderRow = (midElement, index) => {
      const {date_added: dateAdded} = midElement
      const {payment_scheme_code: paymentSchemeCode, mid, visa_bin: visaBin} = midElement.mid_metadata

      return (
        <tr className='h-[60px]' key={index}>
          <td>
            <div className='flex items-center justify-center'>
              <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log(`Checkbox ${index} clicked`)} />
            </div>
          </td>
          <td>
            {renderPaymentSchemeLogo(index, paymentSchemeCode)}
          </td>
          <td className='px-[9px] font-heading-8 font-regular  truncate'>{mid}</td>
          <td className='px-[9px] font-body-3 text-grey-800 truncate'>{visaBin}</td>
          <td className='px-[9px] font-body-3 text-grey-800 truncate'>{dateAdded}</td> {/* TODO: Will need formatting when coming from API */ }
          <td className='px-[9px]'></td>
          <td className='px-[9px]'></td>
        </tr>
      )
    }

    return (
      <div className='mx-[10px]'>
        <div className='flex h-[71px] items-center justify-end pr-[9px]'>
          <button
            onClick={() => console.log('Placeholder: Add Visa MID')}
            aria-label='Add Visa MID'
          ><AddVisaSvg alt=''/>
          </button>
          <button
            onClick={() => console.log('Placeholder: Add Mastercard MID')}
            aria-label='Add Mastercard MID'
          ><AddMastercardSvg alt=''/>
          </button>
          <button
            onClick={() => console.log('Placeholder: Add AMEX MID')}
            aria-label='Add AMEX MID'
          ><AddAmexSvg alt=''/>
          </button>
        </div>

        <table className='w-full min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
          <thead className='h-[38px] text-left bg-grey-200'>
            <tr>
              <th className='px-[9px] w-[40px] rounded-tl-[10px] rounded-bl-[10px]'>
                <div className='flex items-center justify-center'>
                  <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => console.log('Header Checkbox clicked')} />
                </div>
              </th>
              <th className='px-[9px] w-[40px]'></th>
              <th className='px-[9px] font-table-header text-grey-800'>VALUE</th>
              <th className='px-[9px] font-table-header text-grey-800 '>BIN</th>
              <th className='px-[9px] font-table-header text-grey-800'>DATE ADDED</th>
              <th className='px-[9px] font-table-header text-grey-800'>SCHEME STATUS</th>
              <th className='px-[9px] font-table-header text-grey-800 rounded-tr-[10px] rounded-br-[10px]'>HARMONIA STATUS</th>
            </tr>
          </thead>

          <tbody>
            {midsData.map((mid, index) => renderRow(mid, index))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <PageLayout>
        <DirectoryDetailsHeader planId={schemeId} name={name} slug={slug} iconUrl={iconUrl} locationLabel={locationLabel} isMerchant />
        <div className='rounded-[10px] mt-[15px] bg-white dark:bg-grey-825 shadow-[0_1px_6px_0px_rgba(0,0,0,0.5)]'>
          <nav className='grid grid-cols-4 w-full pl-[69px] border-b border-grey-800/10 pr-[10px]'>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 text-grey-900 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white border-b-2 border-b-blue'>
              <span className='place-content-center flex h-[51px] items-center'>MIDs</span>
            </button>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 font-regular text-sm tracking-[0.1px] text-grey-600 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white  hover:text-grey-900 duration-200'>
              <span className='place-content-center flex h-[51px] items-center '>Secondary MIDs</span>
            </button>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 font-regular text-sm tracking-[0.1px] text-grey-600 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white hover:text-grey-900 duration-200'>
              <span className='place-content-center flex h-[51px] items-center'>Locations</span>
            </button>
            <button className='grid gap-1 place-content-center h-[60px] font-heading-8 font-regular text-sm tracking-[0.1px] text-grey-600 dark:text-grey-100 bg-white dark:bg-grey-825 dark:hover:text-white hover:text-grey-900 duration-200'>
              <span className='place-content-center flex h-[51px] items-center'>Identifiers</span>
            </button>
          </nav>
          {renderMerchantDetailsSection()}
        </div>
      </PageLayout>
    </>
  )
}

export default MerchantDetailsPage
