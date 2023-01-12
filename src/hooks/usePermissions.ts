import {useUser} from '@auth0/nextjs-auth0'
import {useMemo} from 'react'

 type Auth0User = {
  name: string
  email: string
  nickname: string
  permissions: Array<string>
  updated_at: string
}

enum Permissions {
  CustomerWalletReadOnly='customer_wallet:ro',
  CustomerWalletReadWrite='customer_wallet:rw',
  CustomerWalletReadWriteDelete='customer_wallet:rwd',
  DirectoryReadOnly='merchant_data:ro',
  DirectoryReadWrite='merchant_data:rw',
  DirectoryReadWriteDelete='merchant_data:rwd',
}


const usePermissions = () => {

  const {user} = useUser()
  const {permissions} = user as Auth0User

  const directory = useMemo(() => ({
    isReader: permissions.includes(Permissions.DirectoryReadOnly),
    isWriter: permissions.includes(Permissions.DirectoryReadWrite),
    isAdmin: permissions.includes(Permissions.DirectoryReadWriteDelete),
  }), [permissions])

  const customerWallet = useMemo(() => ({
    isReader: permissions.includes(Permissions.CustomerWalletReadOnly),
    isWriter: permissions.includes(Permissions.CustomerWalletReadWrite),
    isAdmin: permissions.includes(Permissions.CustomerWalletReadWriteDelete),
  }), [permissions])


  return {
    directory,
    customerWallet,
  }
}

export default usePermissions
