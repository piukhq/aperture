import type {NextPage} from 'next'
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0'
import usePermissions from 'hooks/usePermissions'
import {timeStampToDate} from 'utils/dateFormat'
import {UserPermissions} from 'utils/enums'


type Auth0User = {
  name: string
  email: string
  nickname: string
  permissions: Array<string>
  updated_at: string
}

const PermissionsPage: NextPage = withPageAuthRequired(() => {
  const {midManagement, customerWallet} = usePermissions()
  const {user} = useUser()
  const {name, email, nickname, permissions, updated_at: updatedAt} = user as Auth0User

  const renderPermissions = () => {
    if (permissions) {
      const permissionsList = permissions.map((permission, index) => <span key={index}>{index === 0 ? '' : ', '}{permission}</span>)
      return permissionsList
    } else {
      return (
        <span>No permissions found</span>
      )
    }
  }

  const renderAccessRequest = (role) => (
    <span>No,
      <a className='text-blue' href={`https://teams.microsoft.com/l/chat/0/0?users=cmorrow@bink.com&topicName=Permissions Request&message=I would like have more access to the Portal. Please give me the ${role} role`}> request access</a>
    </span>
  )

  return (
    <div className='m-16 w-full bg-grey-100 dark:bg-grey-825 p-16'>
      <h1 className='font-heading-1 mb-4'>Your Permissions</h1>
      <section className='bg-black/5 dark:bg-white/5 shadow-lg p-8 flex flex-col gap-2 m-8'>
        <h2 className='font-heading-3'>Profile</h2>
        <p className='font-body-2'>Name: {name}</p>
        <p className='font-body-2'>Email: {email}</p>
        <p className='font-body-2'>Nickname: {nickname}</p>
        <p className='font-body-2'>Updated At: {timeStampToDate(updatedAt)}</p>
        <p className='font-body-2'>Permission Roles:  {renderPermissions()}</p>
      </section>
      <section className='bg-black/5 dark:bg-white/5 shadow-lg p-8 flex flex-col gap-2 m-8'>
        <h2 className='font-heading-3'>Permission Levels</h2>
        <section className='bg-black/5 dark:bg-white/5 p-4 m-4'>
          <h3 className='font-heading-5 mb-1'>MID Management</h3>
          <p className='font-body-2'>Read: {midManagement.isReader ? 'Yes' : renderAccessRequest(UserPermissions.MERCHANT_DATA_READ_ONLY)}</p>
          <p className='font-body-2'>Write: {midManagement.isWriter ? 'Yes' : renderAccessRequest(UserPermissions.MERCHANT_DATA_READ_WRITE)}</p>
          <p className='font-body-2'>Admin: {midManagement.isAdmin ? 'Yes' : renderAccessRequest(UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE)}</p>
        </section>
        <section className='bg-black/5 dark:bg-white/5 p-4 m-4'>
          <h3 className='font-heading-5 mb-1'>Customer Wallet</h3>
          <p className='font-body-2'>Read: {customerWallet.isReader ? 'Yes' : renderAccessRequest(UserPermissions.CUSTOMER_WALLET_READ_ONLY)}</p>
          <p className='font-body-2'>Write: {customerWallet.isWriter ? 'Yes' : renderAccessRequest(UserPermissions.CUSTOMER_WALLET_READ_WRITE)}</p>
          <p className='font-body-2'>Admin: {customerWallet.isAdmin ? 'Yes' : renderAccessRequest(UserPermissions.CUSTOMER_WALLET_READ_WRITE_DELETE)}</p>
        </section>
      </section>
    </div>
  )
})

export default PermissionsPage
