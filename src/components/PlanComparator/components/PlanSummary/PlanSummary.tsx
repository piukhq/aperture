import Image from 'next/image'
import {Plan, SelectedPlans} from 'types'
import {ImageTypes} from 'utils/enums'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import LoadingBar from './LoadingBar'


type Props = {
  plansArray: Array<Plan>,
  plans: SelectedPlans,
  totalKeys: number,
  totalMatches: number,
}

const PlanSummary = ({plansArray, plans, totalKeys, totalMatches}: Props) => {
  const heroUrl = plansArray.map(plan => plan.images.filter(image => image.type === ImageTypes.HERO)).flat()[0]?.url || null
  const renderIcon = () => {
    if (heroUrl) {
      return <Image className='rounded-[20px]' src={heroUrl as string} height={200} width={300} alt={heroUrl} data-testid='icon'/>
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
      const environmentBackground = environment === 'prod' ? 'bg-red hover:bg-red/80' : environment === 'staging' ? 'bg-yellow hover:bg-yellow/80' : 'bg-green hover:bg-green/80'
      return plans[environment]?.id && (
        <a key={environment} href={`https://api.${environment === 'prod' ? '' : environment + '.'}gb.bink.com/admin/scheme/scheme/${plans[environment]?.id}/change/`}
          className={`min-h-[30px] w-[150px] rounded-[10px] flex items-center justify-center whitespace-nowrap gap-2 px-[12px] text-grey-100 font-medium font-heading tracking-[0.6px] text-3xs ${environmentBackground}`} // Refactor to an @apply if used elsewhere
          target='_blank'
          rel='noreferrer'
        >View in {capitaliseFirstLetter(environment)}
        </a>
      )
    })
  }

  return (
    <div className='relative w-[800px] h-[230px] rounded-[10px] shadow-md bg-grey-100 dark:bg-grey-800 flex items-center gap-6 p-10 mt-8'>
      <div className='flex flex-col items-center gap-3'>
        {renderIcon()}
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <h1 className='font-heading-4'>{plansArray[0].account.plan_name}</h1>
        <div className='flex flex-col justify-center'>
          <LoadingBar key={plansArray[0].id} width={500} percentage={(totalMatches / totalKeys) * 100}/>
          <div className='flex flex-col w-1/2 text-center items-center justify-center self-center gap-2 mt-4'>
            <div className='w-full flex space-between justify-center gap-4'>
              {renderDjangoLinks()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanSummary
