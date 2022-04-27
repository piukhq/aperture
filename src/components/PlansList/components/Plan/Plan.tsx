import {Tag} from 'components'
import IconImage from '../IconImage'
import {HydratedPlan} from 'types'
import {TagStyle, TagSize, TextStyle} from 'components/Tag/styles'

type Props = {
  plan: HydratedPlan
}

const Plan = ({plan}: Props) => (
  <>
    <div className='flex items-center'>
      <IconImage plan={plan} />
      <p className='font-body text-sm tracking-[0.1px] text-grey-800 dark:text-grey-100'>{plan.account?.plan_name}</p>
    </div>

    <div className='flex items-center'>
      <div className='h-[24px] w-[24px]'>
        {plan.isDev && <Tag tagSize={TagSize.MINI} textStyle={TextStyle.SINGLE_LETTER} tagStyle={TagStyle.AQUAMARINE_FILLED} label='D' />}
      </div>

      <div className='h-[24px] w-[24px]'>
        {plan.isStaging && <Tag tagSize={TagSize.MINI} textStyle={TextStyle.SINGLE_LETTER} tagStyle={TagStyle.YELLOW_FILLED} label='S' />}
      </div>

      <div className='h-[24px] w-[24px]'>
        {/* TODO: To be updated once sandbox is set up */}
        {/* {plan.isSandbox && <Tag tagSize={TagSize.MINI} textStyle={TextStyle.SINGLE_LETTER} tagStyle={TagStyle.LIGHT_BLUE_FILLED} label='S' />} */}
      </div>

      <div className='h-[24px] w-[24px]'>
        {plan.isProd && <Tag tagSize={TagSize.MINI} textStyle={TextStyle.SINGLE_LETTER} tagStyle={TagStyle.RED_FILLED} label='P' />}
      </div>
    </div>
  </>
)


export default Plan
