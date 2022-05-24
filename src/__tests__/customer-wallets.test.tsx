import React from 'react'
import {render, screen} from '@testing-library/react'
import CustomerWalletsPage from 'pages/customer-wallets'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)
jest.mock('components/TextInputGroup', () => () => <div data-testid='user-identifier' />)
jest.mock('components/Button', () => () => <div data-testid='load-user-button' />)

describe('CustomerWalletsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // displayValue state value
    React.useState = jest.fn().mockReturnValue(['', jest.fn()])
  })

  describe('Test component renders', () => {
    it('should render the Dropdown component', () => {
      render(<CustomerWalletsPage />)
      expect(screen.queryByTestId('dropdown')).toBeInTheDocument()
    })

    it('should render the user identifier input field', () => {
      render(<CustomerWalletsPage />)
      expect(screen.queryByTestId('user-identifier')).toBeInTheDocument()
    })

    it('should render the Load User button', () => {
      render(<CustomerWalletsPage />)
      expect(screen.queryByTestId('load-user-button')).toBeInTheDocument()
    })
  })
})
