import {useState} from 'react'
import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {Button, PageLayout, TextInputGroup} from 'components'
import DownloadSvg from 'icons/svgs/download.svg'
import PlusSvg from 'icons/svgs/plus.svg'
import SearchSvg from 'icons/svgs/search.svg'
import ShareSvg from 'icons/svgs/share.svg'
import TaskSvg from 'icons/svgs/task.svg'
import CommentSvg from 'icons/svgs/comment.svg'
import TrashSvg from 'icons/svgs/trash.svg'
import TriangleDownSvg from 'icons/svgs/triangle-down.svg'
import {ButtonWidth, ButtonSize, BorderColour, ButtonBackground, LabelColour, LabelWeight} from 'components/Button/styles'
import {InputType, InputWidth, InputColour, InputStyle} from 'components/TextInputGroup/styles'

import {Listbox} from '@headlessui/react'


const LocationsListPage: NextPage = () => {
  const router = useRouter()
  const {merchantId} = router.query
  const [merchantSelected, setMerchantSelected] = useState(true)
  const [displayValue, setDisplayValue] = useState(10)

  const displayValues = [10, 20, 30, 40]

  const shouldRenderAdditionalOptions = () => {
    if(merchantSelected) {
      return (
        <div className='flex gap-[5px]'>
          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.LIGHTISH_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          ><ShareSvg/>Export
          </Button>

          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.LIGHTISH_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          ><TaskSvg/>Onboard MID
          </Button>

          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.LIGHTISH_GREY}
            labelColour={LabelColour.GREY}
            labelWeight={LabelWeight.SEMIBOLD}
          ><TrashSvg className='fill-grey-600' />Offboard MID
          </Button>

          <Button
            handleClick={() => console.log('button clicked')}
            buttonSize={ButtonSize.MEDIUM}
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

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className='flex w-full items-center justify-between'>
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

      <div className='flex rounded-[10px] h-[152px] mt-[24px] p-[28px] bg-white dark:bg-grey-825'>
        <Image className='rounded-[30px]' src='https://api.staging.gb.bink.com/content/media/hermes/schemes/SquareMeal_Icon.png' height={97} width={97} alt='' data-testid='merchant-icon' />
        <h3 className='font-heading-3 ml-[14px]'>Location list</h3>
      </div>

      <div className='flex flex-row-reverse mt-[11px] w-full justify-between'>
        <div className='flex content-center gap-[10px]'>
          <Button
            handleClick={() => console.log('Bulk import button clicked')}
            buttonSize={ButtonSize.MEDIUM}
            buttonWidth={ButtonWidth.AUTO}
            buttonBackground={ButtonBackground.BLUE}
            labelColour={LabelColour.WHITE}
            labelWeight={LabelWeight.SEMIBOLD}
          ><DownloadSvg />Bulk Import
          </Button>

          <Button
            handleClick={() => console.log('New location button clicked')}
            buttonSize={ButtonSize.MEDIUM}
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
            <h1 className='font-heading-4'>All Locations</h1>

            <Listbox className='flex justify-center flex-col' as='div' value={displayValue} onChange={setDisplayValue}>
              <Listbox.Button className='flex items-center w-[150px] text-grey-600'>
                Show: <span className='ml-[5px] mr-[15px] text-black'>{displayValue}</span><TriangleDownSvg/>
              </Listbox.Button>

              <Listbox.Options as='div'>
                {displayValues.map((value) => (
                  <Listbox.Option
                    key={value}
                    value={value}
                  >
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>

          <h1 className='font-heading-4'>All Locations</h1>
        </div>

        {/* Table */}
        <div className='grid grid-cols-7 gap-2 grid-flow-col w-full text-center mt-[10px]'>

          {/* <div className='flex flex-col'>{renderLabelColumnContents()}</div>
          <div className='flex flex-col'>{dev && renderAssetColumnContents(EnvironmentShortName.DEV)}</div>
          <div className='flex flex-col'>{staging && renderAssetColumnContents(EnvironmentShortName.STAGING)}</div> */}
        </div>
      </div>
    </PageLayout>
  )
}

export default LocationsListPage
