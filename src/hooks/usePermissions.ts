import {useUser} from '@auth0/nextjs-auth0'
import {useMemo} from 'react'
import {UserPermissions} from 'utils/enums'

type Auth0User = {
  name: string
  email: string
  nickname: string
  permissions: Array<string>
  updated_at: string
}

const usePermissions = () => {
  const {user} = useUser()
  const {permissions} = user as Auth0User || {permissions: []}

  const directory = useMemo(() => ({
    isReader: permissions.includes(UserPermissions.MERCHANT_DATA_READ_ONLY),
    isWriter: permissions.includes(UserPermissions.MERCHANT_DATA_READ_WRITE),
    isAdmin: permissions.includes(UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE),
  }), [permissions])

  const customerWallet = useMemo(() => ({
    isReader: permissions.includes(UserPermissions.CUSTOMER_WALLET_READ_ONLY),
    isWriter: permissions.includes(UserPermissions.CUSTOMER_WALLET_READ_WRITE),
    isAdmin: permissions.includes(UserPermissions.CUSTOMER_WALLET_READ_WRITE_DELETE),
  }), [permissions])

  const hasRequiredPermission = (requiredPermission: UserPermissions) => permissions.includes(requiredPermission)

  return {
    directory,
    customerWallet,
    hasRequiredPermission,
  }
}

export default usePermissions
