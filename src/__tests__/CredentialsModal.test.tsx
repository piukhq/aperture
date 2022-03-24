import React from 'react'
import {render, screen} from '@testing-library/react'

import {CredentialsModal} from 'components'

jest.mock('hooks/useVerificationHook', () => ({
  useVerificationHook: jest.fn(),
}))

jest.mock('hooks/useGetPlansHook', () => ({
  useGetPlansHook: jest.fn(),
}))

jest.mock('utils/storage', () => ({
  getDevVerificationToken: jest.fn(),
  getStagingVerificationToken: jest.fn(),
  removeDevVerificationToken: jest.fn(),
  removeStagingVerificationToken: jest.fn(),
}))

jest.mock('utils/validation', () => ({
  isValidEmail: jest.fn(),
  isValidPassword: jest.fn(),
}))

jest.mock('components/CredentialsModal/components/VerificationTag', () => () => <div data-testid='verification-tag'></div>)
jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, unknown>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

React.useState = jest.fn()
const mockEmailValue = 'mock_email_value'
const mockEmailError = 'mock_email_error'
const mockPasswordValue = 'mock_password_value'
const mockPasswordError = 'mock_password_error'

describe('Credentials Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockEmailValue, setStateMock])
      .mockReturnValueOnce([mockEmailError, setStateMock])
      .mockReturnValueOnce([mockPasswordValue, setStateMock])
      .mockReturnValueOnce([mockPasswordError, setStateMock])

    jest.spyOn(require('hooks/useVerificationHook'), 'useVerificationHook').mockImplementation(() => ({
      verifyDevCredentials: jest.fn(),
      verifyStagingCredentials: jest.fn(),
      devIsSuccess: jest.fn(),
      stagingIsSuccess: jest.fn(),
      devError: jest.fn(),
      stagingError: jest.fn(),
      devIsLoading: jest.fn(),
      stagingIsLoading: jest.fn(),
      resetDevToken: jest.fn(),
      resetStagingToken: jest.fn(),
    }))

    jest.spyOn(require('hooks/useGetPlansHook'), 'useGetPlansHook').mockImplementation(() => ({
      resetDevPlans: jest.fn(),
      resetStagingToken: jest.fn(),
    }))

  })

  describe('Test Credential Modal', () => {
    it('should render the correct heading', () => {
      render(<CredentialsModal />)
      const verifyCredentialsButton = screen.getByRole('heading', {
        name: 'Enter Environment Credentials',
      })

      expect(verifyCredentialsButton).toBeInTheDocument()
    })

    it('should render the correct email input', () => {
      render(<CredentialsModal />)

      const emailInput = screen.getByLabelText('Email')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveValue(mockEmailValue)
    })

    it('should render the correct email error message', () => {
      render(<CredentialsModal />)
      const emailError = screen.getByText(mockEmailError)

      expect(emailError).toBeInTheDocument()
    })

    it('should render the correct password input', () => {
      render(<CredentialsModal />)
      const passwordInput = screen.getByLabelText('Password')

      expect(passwordInput).toBeInTheDocument()
      expect(passwordInput).toHaveValue(mockPasswordValue)
    })

    it('should render the correct password error message', () => {
      render(<CredentialsModal />)
      const passwordError = screen.getByText(mockPasswordError)

      expect(passwordError).toBeInTheDocument()
    })

    it('should render the verify credentials button', () => {
      render(<CredentialsModal />)
      const verifyCredentialsButton = screen.getByRole('button', {
        name: 'Verify Credentials',
      })

      expect(verifyCredentialsButton).toBeInTheDocument()
    })

    it('should render the correct environment tags', () => {
      render(<CredentialsModal />)
      const devTag = screen.getByText('Development')
      const stagingTag = screen.getByText('Staging')
      const sandboxTag = screen.getByText('Sandbox')
      const prodTag = screen.getByText('Production')

      expect(devTag).toBeInTheDocument()
      expect(stagingTag).toBeInTheDocument()
      expect(sandboxTag).toBeInTheDocument()
      expect(prodTag).toBeInTheDocument()
    })
    it('should render the correct number of verification tags', () => {
      render(<CredentialsModal />)
      const verificationTags = screen.getAllByTestId('verification-tag')

      expect(verificationTags).toHaveLength(4)
    })

    it('should render the correct footer text', () => {
      render(<CredentialsModal />)
      const footerText = screen.getByText(/If you are struggling to verify credentials, email cmorrow@bink.com for support/i)

      expect(footerText).toBeInTheDocument()
    })
  })
})
