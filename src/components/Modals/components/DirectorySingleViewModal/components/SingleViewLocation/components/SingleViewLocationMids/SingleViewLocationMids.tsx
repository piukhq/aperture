import {useRouter} from 'next/router'
import {Button} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {useMidManagementLocationMids} from 'hooks/useMidManagementLocationMids'
import {DirectoryMerchantLocationMid} from 'types'
import LinkedListItem from '../../../LinkedListItem'
import {LinkableEntities} from 'utils/enums'

const SingleViewLocationMids = () => {
  const router = useRouter()
  const {merchantId, planId, ref} = router.query

  const {getMerchantLocationLinkedMidsResponse, getMerchantLocationLinkedMidsIsLoading} = useMidManagementLocationMids({
    planRef: planId as string,
    merchantRef: merchantId as string,
    locationRef: ref as string,
  })

  const hasNoLinkedMids = (!getMerchantLocationLinkedMidsResponse || getMerchantLocationLinkedMidsResponse.length === 0) && !getMerchantLocationLinkedMidsIsLoading

  const renderLocationMid = (locationMid: DirectoryMerchantLocationMid, index) => {
    const {payment_scheme_code: paymentSchemeCode, mid_value: midValue, mid_ref: midRef} = locationMid
    return (
      <LinkedListItem // TODO: Replace placeholder functionality with actual functionality as per Secondary Mids
        key={index}
        index={index}
        paymentSchemeCode={paymentSchemeCode}
        value={midValue}
        refValue={midRef}
        setSelectedUnlinkIndexFn={() => console.log('Placeholder setUnlinkingMidFn')}
        isInUnlinkingConfirmationState={false} // Placeholder value
        unlinkFn={() => console.log('Placeholder unlinkFn')}
        isUnlinking={false} // Placeholder value
        setShouldRenderNewLinkDropdownMenuFn={() => console.log('Placeholder setShouldRenderDropdownMenuFn')}
        entityType={LinkableEntities.MID}
      />
    )
  }

  const renderContent = () => {
    if (hasNoLinkedMids) {
      return <i className='font-body-4'>There are no MIDs to view.</i>
    }
    return (
      <>
        <section className='flex justify-end items-center mb-[10px]'>
          <Button
            handleClick={() => console.log('Link new MID button clicked')}
            buttonType={ButtonType.SUBMIT}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.MEDIUM}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
            additionalStyles='text-[12px] leading-[12px]'
          >Link New MID
          </Button>
        </section>

        <section>
          <h2 className='font-modal-heading'>LINKED MIDS</h2>
          <div className='flex flex-col gap-[14px]'>
            {getMerchantLocationLinkedMidsResponse.map((locationMid, index) => renderLocationMid(locationMid, index))}
          </div>
        </section>
      </>
    )
  }

  return (
    <div className='pb-[28px]'>
      {getMerchantLocationLinkedMidsIsLoading ? (
        <i className='font-body-4'>Loading...</i>
      ) : renderContent()}
    </div>
  )
}
export default SingleViewLocationMids
