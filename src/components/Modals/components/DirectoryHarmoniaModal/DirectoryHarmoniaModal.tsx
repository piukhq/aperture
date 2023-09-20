import {Button, PaymentCardIcon, Modal} from 'components'
import {ButtonType, ButtonSize, ButtonWidth, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {setSelectedDirectoryEntityCheckedSelection, getSelectedDirectoryEntityCheckedSelection} from 'features/directoryMerchantSlice'
import {getHarmoniaActionType} from 'features/directoryHarmoniaSlice'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {HarmoniaActionTypes, ModalStyle} from 'utils/enums'
import useGetDirectoryRouterString from 'hooks/useGetRouterQueryString'
import {useDirectorySecondaryMids} from 'hooks/useDirectorySecondaryMids'
import {useDirectoryPsimis} from 'hooks/useDirectoryPsimis'
import {useDirectoryMids} from 'hooks/useDirectoryMids'
import {useState} from 'react'
import {DirectoryMerchantEntitySelectedItem} from 'types'
import {capitaliseFirstLetter} from 'utils/stringFormat'

const DirectoryHarmoniaModal = () => {
  enum RouterEntityLabel {
    'mids' = 'MID',
    'secondary-mids'= 'Secondary MID',
    'psimis'= 'PSIMI',
  }

  // TODO can this be replaced wit hthe redux has Harmonia update slice ?
  // TODO: the offboarding and onboarding functions need to be reset in the single view modal
  const [shouldRefreshMids, setShouldRefreshMids] = useState<boolean>(false)
  const [shouldRefreshSecondaryMids, setShouldRefreshSecondaryMids] = useState<boolean>(false)
  const [shouldRefreshPsimis, setShouldRefreshPsimis] = useState<boolean>(false)

  const {planId, merchantId, tab} = useGetDirectoryRouterString()
  const selectedEntities = useAppSelector(getSelectedDirectoryEntityCheckedSelection)
  const hasMultipleEntities = selectedEntities.length > 1
  const entityLabel = tab && `${RouterEntityLabel[tab]}${hasMultipleEntities ? 's' : ''}`
  const entityRefs = selectedEntities.map(entity => entity.entityRef)

  const {
    getMerchantMidsRefresh,
    postMerchantMidOnboarding,
    resetPostMerchantMidOnboardingResponse,
    postMerchantMidOnboardingIsSuccess,
    postMerchantMidOffboarding,
    resetPostMerchantMidOffboardingResponse,
    postMerchantMidOffboardingIsSuccess,
  } = useDirectoryMids({
    skipGetMids: !shouldRefreshMids,
    skipGetMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const {
    getMerchantSecondaryMidsRefresh,
    postMerchantSecondaryMidOnboarding,
    resetPostMerchantSecondaryMidOnboardingResponse,
    postMerchantSecondaryMidOnboardingIsSuccess,
    resetPostMerchantSecondaryMidOffboardingResponse,
    postMerchantSecondaryMidOffboarding,
    postMerchantSecondaryMidOffboardingIsSuccess,
  } = useDirectorySecondaryMids({
    skipGetSecondaryMids: !shouldRefreshSecondaryMids,
    skipGetSecondaryMidsByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const {
    getMerchantPsimisRefresh,
    postMerchantPsimiOnboarding,
    resetPostMerchantPsimiOnboardingResponse,
    postMerchantPsimiOnboardingIsSuccess,
    resetPostMerchantPsimiOffboardingResponse,
    postMerchantPsimiOffboarding,
    postMerchantPsimiOffboardingIsSuccess,
  } = useDirectoryPsimis({
    skipGetPsimis: !shouldRefreshPsimis,
    skipGetPsimisByPage: true,
    planRef: planId,
    merchantRef: merchantId,
  })

  const dispatch = useAppDispatch()
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

  const handleSubmit = () => {
    const requestBody = {
      planRef: planId || 'Plan Ref Missing',
      merchantRef: merchantId || 'Merchant Ref Missing',
    }

    const onboardingFn = () => {
      if (tab === 'mids') {
        setShouldRefreshMids(true)
        return postMerchantMidOnboarding({...requestBody, midRefs: entityRefs})
      } else if (tab === 'secondary-mids') {
        setShouldRefreshSecondaryMids(true)
        return postMerchantSecondaryMidOnboarding({...requestBody, secondaryMidRefs: entityRefs})
      } else if (tab === 'psimis') {
        setShouldRefreshPsimis(true)
        return postMerchantPsimiOnboarding({...requestBody, psimiRefs: entityRefs})
      }
    }

    const offboardingFn = () => {
      if (tab === 'mids') {
        setShouldRefreshMids(true)
        return postMerchantMidOffboarding({...requestBody, midRefs: entityRefs})
      } else if (tab === 'secondary-mids') {
        setShouldRefreshSecondaryMids(true)
        return postMerchantSecondaryMidOffboarding({...requestBody, secondaryMidRefs: entityRefs})
      } else if (tab === 'psimis') {
        setShouldRefreshPsimis(true)
        return postMerchantPsimiOffboarding({...requestBody, psimiRefs: entityRefs})
      }
    }

    harmoniaAction === HarmoniaActionTypes.OFFBOARD ? offboardingFn() : onboardingFn()
  }

  const isSuccess = () => postMerchantMidOnboardingIsSuccess || postMerchantMidOffboardingIsSuccess || postMerchantSecondaryMidOnboardingIsSuccess || postMerchantSecondaryMidOffboardingIsSuccess || postMerchantPsimiOnboardingIsSuccess || postMerchantPsimiOffboardingIsSuccess

  const handleClose = () => {
    dispatch(setSelectedDirectoryEntityCheckedSelection([]))
    if (isSuccess()) {
      if (tab === 'mids' && shouldRefreshMids) {
        resetPostMerchantMidOffboardingResponse()
        resetPostMerchantMidOnboardingResponse()
        getMerchantMidsRefresh()
      } else if (tab === 'secondary-mids' && shouldRefreshSecondaryMids) {
        resetPostMerchantSecondaryMidOffboardingResponse()
        resetPostMerchantSecondaryMidOnboardingResponse()
        getMerchantSecondaryMidsRefresh()
      } else if (tab === 'psimis') {
        resetPostMerchantPsimiOffboardingResponse()
        resetPostMerchantPsimiOnboardingResponse()
        getMerchantPsimisRefresh()
      }
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
