// jest.setup.js
import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'
import {UserPermissions} from './src/utils/enums'

jest.mock('@auth0/nextjs-auth0', () => ({
  Auth0Provider: ({children}) => children,
  withAuthenticationRequired: (component, _) => component,
  withPageAuthRequired: (component) => component,
  useAuth0: () => {
    return {
      isLoading: false,
      user: {sub: 'testUser'},
      isAuthenticated: true,
      loginWithRedirect: jest.fn(),
    }
  },
  useUser: () => {
    return {user: {name: 'Test User', permissions: [
      UserPermissions.MERCHANT_DATA_READ_ONLY,
      UserPermissions.MERCHANT_DATA_READ_WRITE,
      UserPermissions.MERCHANT_DATA_READ_WRITE_DELETE,
    ]}}
  },
}))
