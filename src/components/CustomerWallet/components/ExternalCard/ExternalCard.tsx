type Props = {
  id: number
  isPaymentCard?: boolean
}

const ExternalCard = ({id, isPaymentCard}:Props) => (
  <div className={`dark:bg-grey-825 flex flex-col font-body-4 shadow-md rounded-[8px] p-[6px] ${isPaymentCard ? 'h-[52px] w-[200px]' : 'h-[43px] w-[180px]'}`}>
    <div className='flex flex-col h-full space-between basis-4/5'>
      <p className='font-bold h-full leading-snug flex items-center'>Linked elsewhere</p>
      <p>{id}</p>
    </div>
  </div>
)

export default ExternalCard


