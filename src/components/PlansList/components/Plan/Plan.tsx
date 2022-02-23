import {Tag} from 'components'
import IconImage from '../IconImage'

const Plan = ({plan}) => (
  <>
    <div className='flex items-center'>
      <IconImage plan={plan} />
      <p className='font-body text-sm tracking-[0.1px] text-grey-800 dark:text-grey-100'>{plan.account?.plan_name}</p>
    </div>

    <div className='flex items-center'>
      <div className='h-[24px] w-[24px]'>
        {plan.isDev && <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.AQUAMARINE_FILLED} label='D' />}
      </div>

      <div className='h-[24px] w-[24px]'>
        {plan.isStaging && <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.YELLOW_FILLED} label='S' />}
      </div>

      {/* TODO: To be added once additional environments are set up */}
      {/* <div className='h-[24px] w-[24px]'>
        {plan.isSandbox && <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.LIGHT_BLUE_FILLED} label='S' />}
      </div>

      <div className='h-[24px] w-[24px]'>
        {plan.isProd && <Tag tagSize={Tag.tagSize.MINI} textStyle={Tag.textStyle.SINGLE_LETTER} tagStyle={Tag.tagStyle.RED_FILLED} label='P' />}
      </div> */}
    </div>
  </>
)


export default Plan
