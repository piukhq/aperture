import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'

import {CredentialsModal} from 'components'
import * as utils from 'utils/validation'

jest.mock('hooks/useVerificationHook', () => ({
  useVerificationHook: jest.fn().mockImplementation(() => ({
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
  })),
}))

jest.mock('hooks/useGetPlansHook', () => ({
  useGetPlansHook: jest.fn().mockImplementation(() => ({
    resetDevPlans: jest.fn(),
    resetStagingToken: jest.fn(),
  })),
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

const mockEmailValue = 'mock_email_value'
const mockPasswordValue = 'mock_password_value'

describe('Credentials Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockEmailValue, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([mockPasswordValue, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
  })

  describe('Test Header and Footer', () => {
    it('should render the heading', () => {
      render(<CredentialsModal />)
      const verifyCredentialsButton = screen.getByRole('heading', {
        name: 'Enter Environment Credentials',
      })

      expect(verifyCredentialsButton).toBeInTheDocument()
    })

    it('should render the footer text', () => {
      render(<CredentialsModal />)
      const footerText = screen.getByText(/If you are struggling to verify credentials, email cmorrow@bink.com for support/)

      expect(footerText).toBeInTheDocument()
    })
  })

  describe('Test Email Field', () => {
    it('should render the email input', () => {
      render(<CredentialsModal />)

      const emailInput = screen.getByLabelText('Email')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveValue(mockEmailValue)
    })

    it('should not render the email error message', () => {
      render(<CredentialsModal />)
      const emailError = screen.queryByTestId('credentials-email-input-error')

      expect(emailError).not.toBeInTheDocument()
    })
  })

  describe('Test Password Field', () => {
    it('should render the password input', () => {
      render(<CredentialsModal />)
      const passwordInput = screen.getByLabelText('Password')

      expect(passwordInput).toBeInTheDocument()
      expect(passwordInput).toHaveValue(mockPasswordValue)
    })

    it('should not render the password error message', () => {
      render(<CredentialsModal />)
      const passwordError = screen.queryByTestId('credentials-password-input-error')

      expect(passwordError).not.toBeInTheDocument()
    })
  })

  describe('Test Verify Credentials Button', () => {
    it('should render the verify credentials button', () => {
      render(<CredentialsModal />)
      const verifyCredentialsButton = screen.getByRole('button', {
        name: 'Verify Credentials',
      })

      expect(verifyCredentialsButton).toBeInTheDocument()
    })
  })

  describe('Test Tags', () => {
    it('should render all environment tags', () => {
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
    it('should render all verification tags', () => {
      render(<CredentialsModal />)
      const verificationTags = screen.getAllByTestId('verification-tag')

      expect(verificationTags).toHaveLength(4)
    })
  })

  describe('Test Credential Modal Blank Field Errors', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['', setStateMock])
        .mockReturnValueOnce([true, setStateMock])
        .mockReturnValueOnce(['', setStateMock])
        .mockReturnValueOnce([true, setStateMock])
    })

    it('should render the correct error when email field is blank', () => {
      jest.spyOn(utils, 'isValidEmail').mockImplementation(() => false)
      render(<CredentialsModal />)

      fireEvent.click(screen.getByRole('button', {
        name: 'Verify Credentials',
      }))

      const emailErrorElement = screen.getByTestId('credentials-email-input-error')
      const emailErrorText = screen.getByText(/Enter email/)

      expect(emailErrorElement).toBeInTheDocument()
      expect(emailErrorText).toBeInTheDocument()
    })

    it('should render the correct error when password field is blank', () => {
      jest.spyOn(utils, 'isValidPassword').mockImplementation(() => false)
      render(<CredentialsModal />)

      fireEvent.click(screen.getByRole('button', {
        name: 'Verify Credentials',
      }))
      const passwordErrorElement = screen.getByTestId('credentials-password-input-error')
      const passwordErrorText = screen.getByText(/Enter password/)

      expect(passwordErrorElement).toBeInTheDocument()
      expect(passwordErrorText).toBeInTheDocument()
    })
  })

  describe('Test Credential Modal Invalid Field Errors', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['not_a_valid_email.com', setStateMock])
        .mockReturnValueOnce([true, setStateMock])
        .mockReturnValueOnce(['', setStateMock])
        .mockReturnValueOnce([true, setStateMock])
    })

    it('should render the correct error when email field is invalid', () => {
      jest.spyOn(utils, 'isValidEmail').mockImplementation(() => false)
      render(<CredentialsModal />)
      fireEvent.click(screen.getByRole('button', {
        name: 'Verify Credentials',
      }))
      const emailErrorElement = screen.getByTestId('credentials-email-input-error')
      const emailErrorText = screen.getByText(/Enter valid email/)

      expect(emailErrorElement).toBeInTheDocument()
      expect(emailErrorText).toBeInTheDocument()
    })
  })
})
