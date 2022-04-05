import {useState} from 'react'
import type {NextPage} from 'next'
// import {useRouter} from 'next/router'
import Image from 'next/image'
import {Button, PageLayout, TextInputGroup} from 'components'
import UpArrowSvg from 'icons/svgs/up-arrow.svg'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'
import ShareSvg from 'icons/svgs/share.svg'
import TaskSvg from 'icons/svgs/task.svg'
import EyeSvg from 'icons/svgs/eye.svg'
import VisaSvg from 'icons/svgs/visa-rectangle.svg'
import AmexSvg from 'icons/svgs/amex-rectangle.svg'
import MastercardSvg from 'icons/svgs/mastercard-rectangle.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import TrashSvg from 'icons/svgs/trash.svg'
import TriangleDownSvg from 'icons/svgs/triangle-down.svg'
import DotsSvg from 'icons/svgs/dots.svg'
import {ButtonWidth, ButtonSize, BorderColour, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'

import {Listbox} from '@headlessui/react'
import {useEffect} from 'react'

const LocationsListPage: NextPage = () => {
  // TODO: Use merchant ID in url to find correct merchant in redux
  // const router = useRouter()
  // const {merchantId} = router.query
  const [atLeastOneRowSelected, setAtLeastOneRowSelected] = useState(false)
  const [displayValue, setDisplayValue] = useState(10)
  const [checkedRows, setCheckedRows] = useState([false, false, false])
  const [sortValue, setSortValue] = useState('Newest')

  // const displayValues = [10, 20, 30, 40]
  // const sortValues = ['Newest', 'Oldest']

  useEffect(() => {
    if (!checkedRows.find(row => row === true) && atLeastOneRowSelected) {
      setAtLeastOneRowSelected(false)
    } else if (checkedRows.find(row => row === true) && !atLeastOneRowSelected) {
      setAtLeastOneRowSelected(true)
    }
  }, [checkedRows, atLeastOneRowSelected])

  const handleCheckboxChange = (rowIndex: number) => {
    const updatedCheckedRowState = checkedRows.map((item, index) => index === rowIndex ? !item : item)
    setCheckedRows(updatedCheckedRowState)
  }

  const shouldRenderAdditionalOptions = () => {
    if(atLeastOneRowSelected) {
      return (
        <div className='flex gap-[5px]'>
          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM_LARGE}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.LIGHTISH_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          ><ShareSvg/>Export
          </Button>

          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM_LARGE}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.LIGHTISH_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          ><TaskSvg/>Onboard MID
          </Button>

          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM_LARGE}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.LIGHTISH_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          ><TrashSvg className='fill-grey-600' />Offboard MID
          </Button>

          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM_LARGE}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.LIGHTISH_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          ><CommentSvg />Comments
          </Button>

          <Button
            handleClick={() => console.log('button clicked')}
            buttonWidth={ButtonWidth.ICON_ONLY}
            borderColour={BorderColour.RED}
          ><TrashSvg className='fill-red' />
          </Button>
        </div>
      )
    }
    return null
  }

  const renderRow = (value, index) => {
    return (
      <tr className='h-[48px]' key={index}>
        <td>
          <div className='flex items-center justify-center'>
            <input type='checkbox' className='flex h-[16px] w-[16px]' onChange={() => handleCheckboxChange(index)} />
          </div>
        </td>
        <td className='px-[9px] font-table-cell truncate'>14 Hills</td>
        <td className='px-[9px] font-body-3 truncate'>123456789123456</td>
        <td className='px-[9px] font-body-3 truncate'>BIG LONG ADDRESS THAT GOES ON AND ON</td>
        <td className='px-[9px] font-body-3 truncate'>BIG TOWN ADDRESS THAT GOES ON AND ON</td>
        <td className='px-[9px] font-body-3 truncate'>WC2B 4DD</td>
        <td className='px-[9px]'>
          <div className='flex gap-[2px]'>
            <div className='flex items-center'>
              <VisaSvg />
              <span className='mx-[6px] font-body-3'>2</span>
              <div className='w-[10px] h-[10px] rounded-[5px] bg-green' />
            </div>

            <div className='flex items-center'>
              <MastercardSvg />
              <span className='mx-[6px] font-body-3'>2</span>
              <div className='w-[10px] h-[10px] rounded-[5px] bg-green' />
            </div>

            <div className='flex items-center'>
              <AmexSvg />
              <span className='mx-[6px] font-body-3'>2</span>
              <div className='w-[10px] h-[10px] rounded-[5px] bg-green' />
            </div>
          </div>
        </td>
        <td className='px-[9px]'>
          <div className='flex justify-center'>
            <Button
              handleClick={() => console.log('clicked')}
              buttonSize={ButtonSize.SMALL_MEDIUM_BODY_FONT}
              buttonWidth={ButtonWidth.ICON_TEXT}
              buttonBackground={ButtonBackground.LIGHT_GREY}
              labelColour={LabelColour.GREY}
              labelWeight={LabelWeight.MEDIUM}
            > <EyeSvg fill='#979797' className='w-[20px] h-[25px]'/> View
            </Button>
          </div>
        </td>
        <td className='px-[9px]'>
          <Button
            handleClick={() => console.log('Edit merchant button clicked')}
            buttonWidth={ButtonWidth.ICON_ONLY}
            ariaLabel='More'
          ><DotsSvg/></Button>
        </td>
      </tr>
    )
  }

  return (
    <PageLayout>
      <div className='flex w-full items-center justify-between'>
        {/* TODO: THis breadcrumb functionality will be added at a later date */}
        {/* Breadcrumb */}
        <p className='font-subheading-6 text-blue'>MERCHANTS / SQUAREMEAL</p>

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
      </div>

      <div className='flex rounded-[10px] h-[152px] mt-[14px] pl-[28px] pr-[16px] bg-white dark:bg-grey-825'>
        <div className='flex flex-1 pt-[27px] pb-[32px]'>
          <Image className='rounded-[30px]' src='https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png' height={97} width={97} alt='' data-testid='merchant-icon' />

          <div className='ml-[21px]'>
            <h3 className='font-heading-3 mb-[8px]'>SquareMeal</h3>

            <div className='flex flex-row'>
              <div className='flex flex-col w-[74px]'>
                <p className='font-subheading-5'>Scheme ID</p>
                <p className='font-subheading-5'>Slug</p>
              </div>

              <div className='flex flex-col ml-[91px]'>
                <p className='font-subheading-5'>286</p>
                <p className='font-subheading-5'>squaremeal</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-1 justify-between pt-[17px]'>
          <div className='pt-[25px]'>
            <p className='font-subheading-5'>Supported Payment Schemes</p>
            <div className='flex'>
              <VisaSvg />
              <MastercardSvg />
              <AmexSvg />
            </div>
          </div>
          <Button
            handleClick={() => console.log('Edit merchant button clicked')}
            buttonSize={ButtonSize.MEDIUM_ICON}
            buttonWidth={ButtonWidth.ICON_ONLY}
            borderColour={BorderColour.GREY}
            ariaLabel='Edit Merchant'
          ><DotsSvg/></Button>
        </div>
      </div>

      <div className='flex flex-row-reverse mt-[11px] w-full justify-between'>
        <div className='flex content-center gap-[10px]'>
          <Button
            handleClick={() => console.log('Bulk import button clicked')}
            buttonSize={ButtonSize.MEDIUM_LARGE}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          ><UpArrowSvg />Bulk Import
          </Button>

          <Button
            handleClick={() => console.log('New location button clicked')}
            buttonSize={ButtonSize.MEDIUM_LARGE}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          ><PlusSvg />New Location
          </Button>
        </div>

        {shouldRenderAdditionalOptions()}
      </div>

      <div className='mt-[30px]'>
        {/* Table header */}
        <div className='flex justify-between'>
          <div className='flex gap-[76.5px]'>
            {/* TODO: Must use location_label from Merchant object */}
            <h1 className='font-heading-4'>All Locations</h1>

            <Listbox className='flex justify-center flex-col bg-white rounded-[10px]' as='div' value={displayValue} onChange={setDisplayValue}>
              <Listbox.Button className='flex flex-row-reverse items-center w-auto pl-[12px] text-grey-600 h-full'>
                <div className='flex justify-center items-center w-[28px] ml-[57px] h-full border-l border-grey-200'>
                  <TriangleDownSvg/>
                </div>
                <span className='ml-[7px] mr-[15px] text-black w-auto font-semibold'>{displayValue}</span>
                Show:
              </Listbox.Button>

              {/* TODO: To be added in functionality ticket */}
              {/* <Listbox.Options as='div'>
                {displayValues.map((value) => (
                  <Listbox.Option
                    key={value}
                    value={value}
                  >
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options> */}
            </Listbox>
          </div>

          <Listbox className='flex justify-center flex-col bg-white rounded-[10px]' as='div' value={sortValue} onChange={setSortValue}>
            <Listbox.Button className='flex flex-row-reverse items-center w-auto pl-[12px] text-grey-600 h-full'>
              <div className='flex justify-center items-center w-[28px] ml-[57px] h-full border-l border-grey-200'>
                <TriangleDownSvg/>
              </div>
              <span className='ml-[7px] mr-[15px] text-black w-auto font-semibold'>{sortValue}</span>
                Sort by:
            </Listbox.Button>

            {/* TODO: To be added in functionality ticket */}
            {/* <Listbox.Options as='div'>
                {displayValues.map((value) => (
                  <Listbox.Option
                    key={value}
                    value={value}
                  >
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options> */}
          </Listbox>        </div>

        {/* Table */}
        <table className='w-full mt-[33px] min-w-[200px] rounded-[10px] bg-white dark:bg-grey-825 table-fixed'>
          <thead className='h-[46px] text-left bg-grey-300'>
            <tr>
              <th className='px-[9px] w-[60px]'></th>
              <th className='px-[9px] font-table-header text-grey-800'>NAME</th>
              <th className='px-[9px] font-table-header text-grey-800 '>LOCATION ID</th>
              <th className='px-[9px] font-table-header text-grey-800'>ADDRESS</th>
              <th className='px-[9px] font-table-header text-grey-800'>TOWN</th>
              <th className='px-[9px] font-table-header text-grey-800 '>POSTCODE</th>
              <th className='px-[9px] font-table-header text-grey-800 w-[250px]'>PAYMENT SCHEME</th>
              <th className='px-[9px] font-table-header text-grey-800 w-[90px]'>VIEW</th>
              <th className='px-[9px] font-table-header text-grey-800 w-[80px]'>MORE</th>
            </tr>
          </thead>

          <tbody>
            {new Array(3).fill({})
              .map((value, index) => renderRow(value, index))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  )
}

export default LocationsListPage
