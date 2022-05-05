import {useCallback} from 'react'
import type {NextPage} from 'next'
import {Button, DirectoryTile, PageLayout, TextInputGroup, DirectoryPlanModal, DirectoryPlanDeleteModal} from 'components'
import {useRouter} from 'next/router'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'
import {ButtonWidth, ButtonSize, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'
import {DirectoryPlan, OptionsMenuItems} from 'types'

import {mockPlanData} from 'utils/mockPlanData'
import {
  useAppDispatch,
  useAppSelector,
} from 'app/hooks'
import {
  requestModal,
  selectModal,
} from 'features/modalSlice'
import {setSelectedDirectoryPlan} from 'features/directoryPlanSlice'
import {ModalType} from 'utils/enums'

import AddSvg from 'icons/svgs/plus-filled.svg'
import EditSvg from 'icons/svgs/project.svg'
import OffboardSvg from 'icons/svgs/close-square.svg'
import DeleteSvg from 'icons/svgs/trash-small.svg'

const DirectoryPage: NextPage = () => {
  // TODO: Swap out for real api data
  const planList: DirectoryPlan[] = mockPlanData
  const dispatch = useAppDispatch()
  const modalRequested: ModalType = useAppSelector(selectModal)
  const router = useRouter()

  const handleRequestNewPlanModal = useCallback(() => { dispatch(requestModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN)) }, [dispatch])

  const renderDirectoryPlans = () => (
    <div className='flex mt-[51px] flex-wrap gap-[30px]'>
      {planList.map((plan, index) => {
        const {plan_metadata, plan_counts, plan_ref} = plan
        const {name, icon_url, plan_id, slug} = plan_metadata
        const {merchants, locations, payment_schemes} = plan_counts


        const requestPlanModal = (modalName:ModalType) => {
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
          }))
          dispatch(requestModal(modalName))
        }

        const handleViewClick = () => {
          router.push(`${router?.asPath}/${plan_ref}`)
        }

        const optionsMenuItems:OptionsMenuItems = [
          {
            label: 'Add Merchant',
            icon: <AddSvg/>,
            clickHandler: () => console.log('Clicked'),
          },
          {
            label: 'Edit Plan',
            icon: <EditSvg/>,
            clickHandler: () => requestPlanModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN),
          },
          {
            label: 'Offboard from Harmonia',
            icon: <OffboardSvg/>,
            clickHandler: () => console.log('Clicked'),
          },
          {
            label: 'Delete Plan',
            icon: <DeleteSvg/>,
            isRed: true,
            clickHandler: () => requestPlanModal(ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE),
          },
        ]
        return <DirectoryTile key={index} metadata={plan_metadata} counts={plan_counts} viewClickFn={handleViewClick} optionsMenuItems={optionsMenuItems}/>
      })}
    </div>
  )


  return (
    <>
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_PLAN && <DirectoryPlanModal />}
      {modalRequested === ModalType.MID_MANAGEMENT_DIRECTORY_PLAN_DELETE && <DirectoryPlanDeleteModal />}
      <PageLayout>
        <h3 className='font-heading-3 mb-[5px]'>MID Management</h3>
        <p className='font-subheading-2 mb-[39px]'>Create, view and manage MIDs for the plans configured on the platform</p>

        <div className='flex justify-between'>
          <TextInputGroup
            name='placeholder'
            label='Search'
            placeholder='Search'
            value=''
            onChange={() => null}
            inputType={InputType.SEARCH}
            inputStyle={InputStyle.WHITE_ICON_LEFT_SMALL}
            inputWidth={InputWidth.SMALL}
            inputColour={InputColour.GREY}
            svgIcon={<SearchSvg/>}
          />
          <Button
            handleClick={handleRequestNewPlanModal}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.MEDIUM}
          ><PlusSvg/>New Plan
          </Button>
        </div>
        {planList.length > 0 && renderDirectoryPlans()}
      </PageLayout>
    </>
  )
}

export default DirectoryPage
