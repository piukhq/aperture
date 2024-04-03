import type {NextPage} from 'next'
import {withPageAuthRequired} from '@auth0/nextjs-auth0'
import {Button} from 'components'


const PermissionsPage: NextPage = withPageAuthRequired(() => {
  return (
    <div className='m-16 w-full bg-grey-100 dark:bg-grey-825 p-16'>
      <h1 className='font-heading-1 mb-4'>Smoke Testing</h1>
      <section className='bg-black/5 dark:bg-white/5 shadow-lg p-8 flex flex-col gap-2 m-8'>
        <h2 className='font-heading-3'>Sentry</h2>
        <p className='font-body-3'>Here you can throw an error to test if Sentry is working ok</p>
        <a href='https://sentry.io/organizations/bink/issues/?environment=staging&environment=development&environment=production&project=6175755&statsPeriod=1h' className='text-blue' target='_blank' rel='noreferrer'>Sentry Dashboard</a>
        <Button
          handleClick={() => {
            throw new Error('Sentry Frontend Error')
          }}
        >
          Throw Test error
        </Button>
      </section>
    </div>
  )
})

export default PermissionsPage
