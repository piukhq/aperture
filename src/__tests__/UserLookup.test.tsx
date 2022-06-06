import React from 'react'
import {render, screen} from '@testing-library/react'
import UserLookup from 'components/UserLookup'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)
jest.mock('components/Button', () => () => <div data-testid='load-user-button' />)


// TODO: Add tests for actual table content when pulling from the API

const mockStoreFn = configureStore([])
const store = mockStoreFn({modal: {
  customerWallet: {
    jwtToken: 'mock_jwt_token',
  },
}})

const getUserLookupComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <UserLookup />
  </Provider>
)

describe('UserLookup', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // displayValue state value
    React.useState = jest.fn().mockReturnValue(['', jest.fn()])
  })

  describe('Test component renders', () => {
    it('should render the Dropdown component', () => {
      render(getUserLookupComponent())
      expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the user identifier input field', () => {
      render(getUserLookupComponent())
      expect(screen.queryByTestId('user-identifier')).toBeInTheDocument()
    })

    it('should render the Load User button', () => {
      render(getUserLookupComponent())
      expect(screen.queryByTestId('load-user-button')).toBeInTheDocument()
    })
  })
})
