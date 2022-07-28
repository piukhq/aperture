import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementLocationMids} from 'hooks/useMidManagementLocationMids'
import {DirectoryMerchantLocationSecondaryMid} from 'types'
import LocationMidsListItem from '../LocationMidsListItem'

const SingleViewLocationSecondaryMids = () => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {getMerchantLocationLinkedSecondaryMidsResponse, getMerchantLocationLinkedSecondaryMidsIsLoading} = useMidManagementLocationMids({
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
    skipGetLocationLinkedMids: true,
  })

  const noLinkedSecondaryMids = (!getMerchantLocationLinkedSecondaryMidsResponse || getMerchantLocationLinkedSecondaryMidsResponse.length === 0) && !getMerchantLocationLinkedSecondaryMidsIsLoading

  const renderLocationSecondaryMid = (locationSecondaryMid: DirectoryMerchantLocationSecondaryMid, index) => {
    const {payment_scheme_code: paymentSchemeCode, secondary_mid_value: secondaryMidValue, secondary_mid_ref: secondaryMidRef} = locationSecondaryMid
    return <LocationMidsListItem key={index} index={index} paymentSchemeCode={paymentSchemeCode} value={secondaryMidValue} refValue={secondaryMidRef} />
  }

  const renderContent = () => {
    if (noLinkedSecondaryMids) {
      return <i className='font-body-4'>There are no Secondary MIDs to view.</i>
    }
    return (
      <>
        <section className='flex justify-end items-center mb-[10px]'>
          <Button
            handleClick={() => console.log('Link new Secondary MID button clicked')}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            additionalStyles='text-[12px] leading-[12px]'
          >Link New Secondary MID
          </Button>
        </section>

        <section>
          <h2 className='font-single-view-heading'>LINKED SECONDARY MIDS</h2>
          <div className='flex flex-col gap-[14px]'>
            {getMerchantLocationLinkedSecondaryMidsResponse.map((locationSecondaryMid, index) => renderLocationSecondaryMid(locationSecondaryMid, index))}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className='pb-[28px]'>
      {getMerchantLocationLinkedSecondaryMidsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderContent()}
    </div>
  )
}
export default SingleViewLocationSecondaryMids
