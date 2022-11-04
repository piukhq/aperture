import Image from 'next/image'
import {Plan, SelectedPlans} from 'types'
import {ImageTypes} from 'utils/enums'


type Props = {
  plansArray: Array<Plan>,
  plans: SelectedPlans,
}

const PlanSummary = ({plansArray, plans}: Props) => {
  const iconUrl = plansArray.map(plan => plan.images.filter(image => image.type === ImageTypes.ICON)).flat()[0].url
  const renderIcon = () => {
    if (iconUrl) {
      return <Image className='rounded-[20px]' src={iconUrl as string} height={93} width={93} alt='' data-testid='icon'/>
    }
    return (
      <div className='flex justify-center items-center rounded-[30px] h-[93px] w-[93px] bg-grey-200'>
        <p className='font-body-3 italic text-black '>No icon</p>
      </div>
    )
  }

  const renderDjangoLinks = () => {
    const environments = Object.keys(plans)
    return environments.map(environment => {
      return (
        <a key={environment} href={`https://api.${environment === 'prod' ? '' : environment + '.'}gb.bink.com/admin/scheme/scheme/${plans[environment]?.id}/change/`}
          className='min-h-[38px] w-max rounded-[10px] flex items-center justify-center whitespace-nowrap gap-2 px-[12px] bg-blue text-grey-100 font-medium font-heading tracking-[0.6px] text-sm' // Refactor to an @apply if used elsewhere
          target='_blank'
          rel='noreferrer'
        >{environment}
        </a>
      )
    })
  }

  return (
    <div className='relative w-[363px] h-[331px] rounded-[20px] shadow-md'>
      <div className='flex flex-col items-center mt-[28px] gap-3'>
        {renderIcon()}
        <h1 className='font-heading-3'>{plansArray[0].account.plan_name}</h1>

        <div className='w-1/2 bg-yellow'>
          <p> 45 out of 50 categories match</p>
        </div>
        <div className='w-full bg-orange text-center'>
          <h2 className='font-heading-8'>Django Environments</h2>
          <div className='w-full flex space-between'>
            {renderDjangoLinks()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanSummary
