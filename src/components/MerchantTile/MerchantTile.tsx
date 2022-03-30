import Image from 'next/image'
import {Button} from 'components'
import DotsSvg from 'icons/svgs/dots.svg'
import {ButtonType, ButtonBackground, ButtonWidth, ButtonSize, BorderColour, LabelColour, LabelWeight} from 'components/Button/styles'

type Props = {
  // TODO: expand type definition
  merchant: object,
}

const MerchantTile = ({merchant}: Props) => {
  const paymentSchemes = ['visa', 'mastercard', 'amex']

  const renderPaymentSchemeInfo = (paymentScheme) => (
    <div key={paymentScheme} className='flex flex-col items-center'>
      <p className='font-subheading-4'>{paymentScheme.toLocaleUpperCase()}</p>
      <p className='font-heading-5'>{merchant[paymentScheme]}</p>
    </div>
  )

  return (
    <div className='relative w-[310px] h-[331px] rounded-[20px] bg-white dark:bg-grey-825'>
      <div className='absolute top-[17px] right-[22px]'>
        <Button
          handleClick={() => console.log('Edit merchant button clicked')}
          buttonSize={ButtonSize.MEDIUM_ICON}
          buttonWidth={ButtonWidth.ICON_ONLY}
          borderColour={BorderColour.GREY}
          ariaLabel='Edit Merchant'
        ><DotsSvg/></Button>
      </div>

      <div className='flex flex-col items-center mt-[28px]'>
        <Image src='/icons/svgs/construction.svg' height={93} width={93} alt='' />
        <p className='font-heading-5 mt-[5px]'>{merchant.name}</p>
        <p className='font-subheading-5 mt-[6px]'>{merchant.noOfStores} stores</p>

        <div className='flex mt-[16px] mb-[20px] w-[218px] justify-between'>
          {paymentSchemes.map(scheme => renderPaymentSchemeInfo(scheme))}
        </div>

        <Button
          handleClick={() => console.log('View merchant stores button clicked')}
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonWidth={ButtonWidth.LARGE}
          buttonBackground={ButtonBackground.BLUE}
          labelColour={LabelColour.WHITE}
          labelWeight={LabelWeight.MEDIUM}
          ariaLabel='View Merchant Stores'
        >View Stores</Button>
      </div>
    </div>
  )
}

export default MerchantTile
