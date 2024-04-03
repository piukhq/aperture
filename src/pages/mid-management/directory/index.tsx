import {useCallback, useEffect, useMemo, useState} from 'react'
import type {NextPage} from 'next'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {Button, DirectoryTile, HeadMetadata, PageLayout, TextInputGroup} from 'components'
import {useRouter} from 'next/router'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import DirectoryTileSkeleton from 'components/DirectoryTile/DirectoryTileSkeleton'
import {DirectoryPlan, OptionsMenuItems} from 'types'
import {usePrefetch as useMerchantPrefetch} from 'services/DirectoryMerchants'
import {usePrefetch as useMidsPrefetch} from 'services/DirectoryMerchantMids'
import {useDirectoryPlans} from 'hooks/useDirectoryPlans'
import {useAppDispatch} from 'app/hooks'
import {setModalHeader, setCommentsRef, setCommentsSubjectType, setCommentsOwnerRef} from 'features/directoryCommentsSlice'
import {requestModal} from 'features/modalSlice'
import {setSelectedDirectoryPlan, reset} from 'features/directoryPlanSlice'
import {getPlanMidCountFromPaymentSchemes} from 'utils/paymentSchemes'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'
import {CommentsSubjectTypes, ModalType, UserPermissions} from 'utils/enums'
import AddSvg from 'icons/svgs/plus-filled.svg'
import EditSvg from 'icons/svgs/project.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'
import TableSvg from 'icons/svgs/table.svg'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'

const DirectoryPage: NextPage = withPageAuthRequired(() => {
  const [planRefForSingleMerchant, setPlanRefForSingleMerchant] = useState<string>('')
  const {getPlansResponse, getPlanResponse, getPlansIsLoading} = useDirectoryPlans({skipGetPlan: !planRefForSingleMerchant, planRef: planRefForSingleMerchant})
  const planList: DirectoryPlan[] = useMemo(() => getPlansResponse || [], [getPlansResponse])
  const [searchValue, setSearchFieldValue] = useState<string>('')
  const [filteredPlans, setFilteredPlans] = useState<DirectoryPlan[]>(planList)
  const isMobileViewport = useIsMobileViewportDimensions()

  const prefetchMerchant = useMerchantPrefetch('getMerchant')
  const prefetchMids = useMidsPrefetch('getMerchantMids')

  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => { // Clear any previously selected plan
    dispatch(reset())
  }, [dispatch])

  useEffect(() => { // Make sure filtered plans are updated when plan list loads
    !searchValue && setFilteredPlans(planList)
  }, [planList, searchValue])

  useEffect(() => { // Use single plan data to redirect accordingly for 1 merchant plans, prefetching merchant and mids data
    if (getPlanResponse) {
      const merchantRef = getPlanResponse.merchants[0].merchant_ref
      prefetchMerchant({planRef: planRefForSingleMerchant, merchantRef})
      prefetchMids({planRef: planRefForSingleMerchant, merchantRef})
      router.push(`${router?.asPath}/${planRefForSingleMerchant}/${merchantRef}`)
    }
  }, [getPlanResponse, planRefForSingleMerchant, prefetchMerchant, prefetchMids, router])

  const handleRequestNewPlanModal = useCallback(() => {
    dispatch(reset())
    dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN))
  }, [dispatch])

  const renderDirectoryPlans = () => {
    if (filteredPlans.length === 0 && searchValue.length > 0) {
      return (
        <div className='flex justify-center items-center w-full h-[300px]'>
          <p className='font-subheading-2 text-grey-600 dark:text-grey-500'>No matches returned. Please check spelling and try again</p>
        </div>
      )
    }

    return filteredPlans.map((plan, index) => {
      const {plan_metadata, plan_counts, plan_ref} = plan
      const {name, icon_url, plan_id, slug} = plan_metadata
      const {merchants = 0, locations = 0, payment_schemes = []} = plan_counts || {}

      const setSelectedPlan = () => {
        dispatch(setSelectedDirectoryPlan({
          plan_ref: plan_ref,
          plan_metadata: {
            name,
            icon_url,
            plan_id,
            slug,
          },
          plan_counts: {
            merchants,
            locations,
            payment_schemes,
          },
          total_mid_count: getPlanMidCountFromPaymentSchemes(payment_schemes),
        }))
      }
      const requestPlanModal = (modalName: ModalType) => {
        setSelectedPlan()
        dispatch(requestModal(modalName))
      }

      const requestPlanCommentsModal = () => {
        dispatch(setModalHeader(name))
        dispatch(setCommentsRef(plan_ref))
        dispatch(setCommentsOwnerRef(plan_ref))
        dispatch(setCommentsSubjectType(CommentsSubjectTypes.PLAN))
        dispatch(requestModal(ModalType.MID_MANAGEMENT_COMMENTS))
      }

      const handleViewClick = () => {
        setSelectedPlan()
        merchants === 1 ? setPlanRefForSingleMerchant(plan_ref) : router.push(`${router?.asPath}/${plan_ref}`) // If only one merchant, redirect to merchant details page, otherwise redirect to plan details page
      }

      const handleAddMerchantClick = () => {
        setSelectedPlan()
        dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_MERCHANT))
      }

      const handleFileUploadClick = () => {
        setSelectedPlan()
        dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_FILE_UPLOAD))
      }

      const optionsMenuItems: OptionsMenuItems = [
        {
          label: 'Add Merchant',
          icon: <AddSvg />,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
          clickHandler: () => handleAddMerchantClick(),
        },
        {
          label: 'Edit Plan',
          icon: <EditSvg />,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
          clickHandler: () => requestPlanModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN),
        },
        {
          label: 'View Comments',
          icon: <CommentSvg />,
          clickHandler: () => requestPlanCommentsModal(),
        },
        {
          label: 'Upload File',
          icon: <TableSvg />,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE,
          clickHandler: () => handleFileUploadClick(),
        },
        {
          label: 'Delete Plan',
          icon: <DeleteSvg />,
          isRed: true,
          requiredPermission: UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE,
          clickHandler: () => requestPlanModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE),
        },
      ]
      if (plan_counts && plan_metadata) {
        return <DirectoryTile key={index} metadata={plan_metadata} counts={plan_counts} viewClickFn={handleViewClick} optionsMenuItems={optionsMenuItems} />
      }
    })
  }

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFieldValue(event.target.value)
    setFilteredPlans(planList.filter((plan) => {
      return plan.plan_metadata.name.toLowerCase().includes(event.target.value.toLowerCase())
    }))
  }

  return (
    <>
      <HeadMetadata pageTitle='MID Directory' pageDescription='Manage MIDs, locations, secondary MIDs and PSIMIs' />
      <PageLayout>
        <h3 className='font-heading-3 mb-[5px]'>MID Directory</h3>
        <p className='font-subheading-2 mb-[39px]'>Create, view and manage MIDs for the plans configured on the platform</p>
        <div className={`flex justify-between sticky ${isMobileViewport ? 'top-14' : 'top-0'} z-40 pt-3 pb-4 bg-grey-200/90 dark:bg-grey-900`}>
          <div className='shadow-md rounded-[10px]'>
            <TextInputGroup
              name='search'
              label='Search'
              placeholder='Search by retailer'
              value={searchValue}
              onChange={handleSearchInputChange}
              inputType={InputType.SEARCH}
              inputStyle={InputStyle.WHITE_ICON_LEFT_SMALL}
              inputWidth={InputWidth.MEDIUM}
              inputColour={InputColour.GREY}
              svgIcon={<SearchSvg />}
            />
          </div>
          <Button
            handleClick={handleRequestNewPlanModal}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
            requiredPermission={UserPermissions.MERCHANT_DATA_READ_WRITE}
          ><PlusSvg />New Plan
          </Button>
        </div>
        <div className={`duration-200 ease-in ${getPlansResponse ? 'opacity-100' : 'opacity-70 blur-sm'}`}>
          {planList && (
            <div className={`flex w-full mt-[50px] flex-wrap gap-[30px] ${isMobileViewport ? 'justify-center' : 'justify-start'}`}>
              {renderDirectoryPlans()}
            </div>
          )}
          {getPlansIsLoading && (
            <div className={`flex w-full flex-wrap gap-[30px] ${isMobileViewport ? 'justify-center' : 'justify-start'}`}>
              {Array(8).fill(0)
                .map((_, index) => <DirectoryTileSkeleton key={index} />)}
            </div>
          )}
        </div>
      </PageLayout>
    </>
  )
})

export default DirectoryPage
