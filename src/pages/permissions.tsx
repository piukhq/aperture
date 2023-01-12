import type {NextPage} from 'next'
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0'
import usePermissions from 'hooks/usePermissions'
import {timeStampToDate} from 'utils/dateFormat'


type Auth0User = {
  name: string
  email: string
  nickname: string
  permissions: Array<string>
  updated_at: string
}

const PermissionsPage: NextPage = withPageAuthRequired(() => {

  const {directory, customerWallet} = usePermissions()
  const {user} = useUser()
  const {name, email, nickname, permissions, updated_at: updatedAt} = user as Auth0User

  const renderPermissions = () => {
    if (permissions) {
      return (
        <ul className='flex flex-col gap-2'>
          {permissions.map((permission, index) => {
            return (
              <li className='font-body-2' key={index}>{permission}</li>
            )
          })}
        </ul>
      )
    } else {
      return (
        <p className='font-body-2'>No permissions found</p>
      )
    }
  }

  return (
    <div className='m-16 w-full bg-grey-100 dark:bg-grey-825 p-16'>
      <h1 className='font-heading-1 mb-4'>Your Permissions</h1>
      <p className='font-body-1 mb-8'>Let&apos;s check what we know about you and what you can access...</p>

      <section className='bg-black/5 dark:bg-white/5 shadow-lg p-8 flex flex-col gap-2 m-8'>
        <h2 className='font-heading-3'>Profile</h2>
        <p className='font-body-2'>Name: {name}</p>
        <p className='font-body-2'>Email: {email}</p>
        <p className='font-body-2'>Nickname: {nickname}</p>
        <p className='font-body-2'>Updated At: {timeStampToDate(updatedAt)}</p>
      </section>

      <section className='bg-black/5 dark:bg-white/5 shadow-lg p-8 flex flex-col gap-2 m-8'>
        <h2 className='font-heading-3'>Auth0 Roles</h2>
        {renderPermissions()}
      </section>

      <section className='bg-black/5 dark:bg-white/5 shadow-lg p-8 flex flex-col gap-2 m-8'>
        <h2 className='font-heading-3'>Access Tests</h2>
        <section className='bg-black/5 dark:bg-white/5 p-4 m-4'>
          <h3 className='font-heading-5 mb-1'>Directory</h3>
          <p className='font-body-2'>Directory Read: {directory.isReader ? 'Yes' : 'No'}</p>
          <p className='font-body-2'>Directory Write: {directory.isWriter ? 'Yes' : 'No'}</p>
          <p className='font-body-2'>Directory Admin: {directory.isAdmin ? 'Yes' : 'No'}</p>
        </section>
        <section className='bg-black/5 dark:bg-white/5 p-4 m-4'>
          <h3 className='font-heading-5 mb-1'>Customer Wallet</h3>
          <p className='font-body-2'>Customer Wallet Read: {customerWallet.isReader ? 'Yes' : 'No'}</p>
          <p className='font-body-2'>Customer Wallet Write: {customerWallet.isWriter ? 'Yes' : 'No'}</p>
          <p className='font-body-2'>Customer Wallet Admin: {customerWallet.isAdmin ? 'Yes' : 'No'}</p>
        </section>
      </section>
    </div>
  )
})

export default PermissionsPage
