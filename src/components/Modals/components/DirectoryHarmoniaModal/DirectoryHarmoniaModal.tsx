import {Button, PaymentCardIcon, Modal} from 'components'
import {ButtonType, ButtonSize, ButtonWidth, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryEntityCheckedSelection, setHasHarmoniaStatusUpdate, getHasHarmoniaStatusUpdate, setShouldRefreshEntityList} from 'features/directoryMerchantSlice'
import {getHarmoniaActionType} from 'features/directoryHarmoniaSlice'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {HarmoniaActionTypes, ModalStyle} from 'utils/enums'
import useGetDirectoryRouterString from 'hooks/useGetRouterQueryString'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import {DirectoryMerchantEntitySelectedItem} from 'types'
import {capitaliseFirstLetter} from 'utils/stringFormat'

const DirectoryHarmoniaModal = () => {
  enum RouterEntityLabel {
    'mids' = 'MID',
    'secondary-mids'= 'Secondary MID',
    'psimis'= 'PSIMI',
  }

  const {planId, merchantId, tab} = useGetDirectoryRouterString()
  const selectedEntities = useAppSelector(getSelectedDirectoryEntityCheckedSelection)
  const hasMultipleEntities = selectedEntities.length > 1
  const entityLabel = tab && `${RouterEntityLabel[tab]}${hasMultipleEntities ? 's' : ''}`
  const entityRefs = selectedEntities.map(entity => entity.entityRef)

  const {
    postMerchantMidOnboarding,
    resetPostMerchantMidOnboardingResponse,
    postMerchantMidOnboardingIsSuccess,
    postMerchantMidOffboarding,
    resetPostMerchantMidOffboardingResponse,
    postMerchantMidOffboardingIsSuccess,
  } = useDirectoryMids({
    skipGetMids: true,
    skipGetMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const {
    postMerchantSecondaryMidOnboarding,
    resetPostMerchantSecondaryMidOnboardingResponse,
    postMerchantSecondaryMidOnboardingIsSuccess,
    resetPostMerchantSecondaryMidOffboardingResponse,
    postMerchantSecondaryMidOffboarding,
    postMerchantSecondaryMidOffboardingIsSuccess,
  } = useDirectorySecondaryMids({
    skipGetSecondaryMids: true,
    skipGetSecondaryMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const {
    postMerchantPsimiOnboarding,
    resetPostMerchantPsimiOnboardingResponse,
    postMerchantPsimiOnboardingIsSuccess,
    resetPostMerchantPsimiOffboardingResponse,
    postMerchantPsimiOffboarding,
    postMerchantPsimiOffboardingIsSuccess,
  } = useDirectoryPsimis({
    skipGetPsimis: true,
    skipGetPsimisByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const dispatch = useAppDispatch()
  const hasHarmoniaStatusUpdate = useAppSelector(getHasHarmoniaStatusUpdate)
  const errorMessage = '' // Placeholder for functionality to be added
  const harmoniaAction = useAppSelector(getHarmoniaActionType)
  const harmoniaActionCapitalised = capitaliseFirstLetter(harmoniaAction)

  const renderListItem = (listItem: DirectoryMerchantEntitySelectedItem) => {
    const {entityRef, entityValue, paymentSchemeSlug} = listItem
    return (
      <li className='font-bold flex items-center gap-[2px]' key={entityRef}>
        {entityValue}
        {paymentSchemeSlug && (
          <PaymentCardIcon
            paymentSchemeSlug={paymentSchemeSlug}
            paymentSchemeIconStyles='flex w-[20px] h-[15px] justify-center mx-[2px] items-center'
          />
        )}
      </li>
    )
  }

  const handleSubmit = () => { // This has mirroring functionality in DirectorySingleViewModal and Harmonia Status. The initial submit action flags there is a status update and thus reuqests a refresh of the entity and entities on modal close
    const requestBody = {
      planRef: planId || 'Plan Ref Missing',
      merchantRef: merchantId || 'Merchant Ref Missing',
    }

    const onboardingFn = () => {
      if (tab === 'mids') {
        return postMerchantMidOnboarding({...requestBody, midRefs: entityRefs})
      } else if (tab === 'secondary-mids') {
        return postMerchantSecondaryMidOnboarding({...requestBody, secondaryMidRefs: entityRefs})
      } else if (tab === 'psimis') {
        return postMerchantPsimiOnboarding({...requestBody, psimiRefs: entityRefs})
      }
    }

    const offboardingFn = () => {
      if (tab === 'mids') {
        return postMerchantMidOffboarding({...requestBody, midRefs: entityRefs})
      } else if (tab === 'secondary-mids') {
        return postMerchantSecondaryMidOffboarding({...requestBody, secondaryMidRefs: entityRefs})
      } else if (tab === 'psimis') {
        return postMerchantPsimiOffboarding({...requestBody, psimiRefs: entityRefs})
      }
    }
    dispatch(setHasHarmoniaStatusUpdate(true))
    harmoniaAction === HarmoniaActionTypes.OFFBOARD ? offboardingFn() : onboardingFn()
  }

  const isSuccess = () => postMerchantMidOnboardingIsSuccess || postMerchantMidOffboardingIsSuccess || postMerchantSecondaryMidOnboardingIsSuccess || postMerchantSecondaryMidOffboardingIsSuccess || postMerchantPsimiOnboardingIsSuccess || postMerchantPsimiOffboardingIsSuccess

  const handleClose = () => {
    dispatch(setSelectedDirectoryEntityCheckedSelection([]))
    if (hasHarmoniaStatusUpdate) {
      if (tab === 'mids') {
        resetPostMerchantMidOffboardingResponse()
        resetPostMerchantMidOnboardingResponse()
      } else if (tab === 'secondary-mids') {
        resetPostMerchantSecondaryMidOffboardingResponse()
        resetPostMerchantSecondaryMidOnboardingResponse()
      } else if (tab === 'psimis') {
        resetPostMerchantPsimiOffboardingResponse()
        resetPostMerchantPsimiOnboardingResponse()
      }
      dispatch(setHasHarmoniaStatusUpdate(false))
      dispatch(setShouldRefreshEntityList(true))
    }
  }

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader={`${harmoniaActionCapitalised} ${entityLabel}` } onCloseFn={handleClose}>
      <section className='flex flex-col gap-[30px] my-[30px] font-body-3'>
        <p data-testid='paragraph-1'>Are you sure you want to <strong>{harmoniaAction}</strong> the following {entityLabel}:</p>
        <ul>
          {selectedEntities.map(entity => renderListItem(entity))}
        </ul>
        {harmoniaAction === HarmoniaActionTypes.UPDATE && <p>{hasMultipleEntities ? '' : 'This '}{entityLabel} will be updated in Harmonia to include current location links and metadata</p>}
      </section>
      <section className='border-t-[1px] border-t-grey-200 dark:border-t-grey-800 pt-[15px] flex justify-between items-center'>
        <p role='alert' className='font-body-4 text-red text-center w-full'>{errorMessage}</p>
        <Button
          handleClick={handleSubmit}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.AUTO}
          buttonBackground={harmoniaAction === HarmoniaActionTypes.OFFBOARD ? ButtonBackground.RED : ButtonBackground.BLUE}
          isDisabled={isSuccess()}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.SEMIBOLD}
        >{`${harmoniaActionCapitalised}${isSuccess() ? 'ing' : ''} ${entityLabel}`}
        </Button>
      </section>
    </Modal>
  )
}

export default DirectoryHarmoniaModal
