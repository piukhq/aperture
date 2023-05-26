// jest.setup.js
import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'
import {UserPermissions} from './src/utils/enums'

jest.mock('@auth0/nextjs-auth0', () => ({ // Mocks auth0 as an admin user
  withPageAuthRequired: (component) => component,
  useUser: () => {
    return {user: {permissions: [
      UserPermissions.MERCHANT_DATA_READ_ONLY,
      UserPermissions.MERCHANT_DATA_READ_WRITE,
      UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE,
    ]}}
  },
}))

jest.mock('next/router', () => require('next-router-mock'))
