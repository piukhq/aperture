import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'

import {CredentialsModal} from 'components/Modals'
import * as utils from 'utils/validation'

jest.mock('hooks/useVerification', () => ({
  useVerification: jest.fn().mockImplementation(() => ({
    verifyDevCredentials: jest.fn(),
    verifyStagingCredentials: jest.fn(),
    verifyProdCredentials: jest.fn(),
    devIsSuccess: jest.fn(),
    stagingIsSuccess: jest.fn(),
    prodIsSuccess: jest.fn(),
    devError: jest.fn(),
    stagingError: jest.fn(),
    prodError: jest.fn(),
    devIsLoading: jest.fn(),
    stagingIsLoading: jest.fn(),
    prodIsLoading: jest.fn(),
    resetDevToken: jest.fn(),
    resetStagingToken: jest.fn(),
    resetProdToken: jest.fn(),
  })),
}))

jest.mock('hooks/useGetPlans', () => ({
  useGetPlans: jest.fn().mockImplementation(() => ({
    resetDevPlans: jest.fn(),
    resetStagingToken: jest.fn(),
    resetProdToken: jest.fn(),
  })),
}))

jest.mock('utils/storage', () => ({
  getDevVerificationToken: jest.fn(),
  getStagingVerificationToken: jest.fn(),
  getProdVerificationToken: jest.fn(),
  removeDevVerificationToken: jest.fn(),
  removeStagingVerificationToken: jest.fn(),
  removeProdVerificationToken: jest.fn(),
}))

jest.mock('utils/validation', () => ({
  isValidEmail: jest.fn(),
  isValidPassword: jest.fn(),
}))

jest.mock('components/Modals/components/CredentialsModal/components/VerificationTag', () => () => <div data-testid='verification-tag'></div>)

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, React.ReactNode>) {
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

const getCredentialsModal = () => <CredentialsModal />

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
      render(getCredentialsModal())
      const heading = screen.getByRole('heading', {
        name: 'Enter Environment Credentials',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the footer text', () => {
      render(getCredentialsModal())
      const footerText = screen.getByText(/If you are struggling to verify credentials, email cmorrow@bink.com for support/)

      expect(footerText).toBeInTheDocument()
    })
  })

  describe('Test Email Field', () => {
    it('should render the email input', () => {
      render(getCredentialsModal())
      const emailInput = screen.getByLabelText('Email')

      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveProperty('autofocus')
      expect(emailInput).toHaveValue(mockEmailValue)
    })

    it('should be focused by default', () => {
      render(getCredentialsModal())
      const emailInput = screen.getByLabelText('Email')

      expect(emailInput).toHaveProperty('autofocus')

    })

    it('should not render the email error message', () => {
      render(getCredentialsModal())
      const emailError = screen.queryByTestId('credentials-email-input-error')

      expect(emailError).not.toBeInTheDocument()
    })
  })

  describe('Test Password Field', () => {
    it('should render the password input', () => {
      render(getCredentialsModal())
      const passwordInput = screen.getByLabelText('Password')

      expect(passwordInput).toBeInTheDocument()
      expect(passwordInput).toHaveValue(mockPasswordValue)
    })

    it('should not render the password error message', () => {
      render(getCredentialsModal())
      const passwordError = screen.queryByTestId('credentials-password-input-error')

      expect(passwordError).not.toBeInTheDocument()
    })
  })

  describe('Test Verify Credentials Button', () => {
    it('should render the verify credentials button', () => {
      render(getCredentialsModal())
      const verifyCredentialsButton = screen.getByRole('button', {
        name: 'Verify Credentials',
      })

      expect(verifyCredentialsButton).toBeInTheDocument()
    })
  })

  describe('Test Tags', () => {
    it('should render all environment tags', () => {
      render(getCredentialsModal())
      const devTag = screen.getByText('Development')
      const stagingTag = screen.getByText('Staging')
      const prodTag = screen.getByText('Production')

      expect(devTag).toBeInTheDocument()
      expect(stagingTag).toBeInTheDocument()
      expect(prodTag).toBeInTheDocument()
    })
    it('should render all verification tags', () => {
      render(getCredentialsModal())
      const verificationTags = screen.getAllByTestId('verification-tag')

      expect(verificationTags).toHaveLength(3)
    })
  })

  describe('Test Credential Modal Blank Field Errors', () => {
    beforeEach(() => {
      jest.clearAllMocks()

      jest.spyOn(utils, 'isValidEmail').mockImplementation(() => false)
      jest.spyOn(utils, 'isValidPassword').mockImplementation(() => false)

      const setStateMock = jest.fn()
      React.useState = jest
        .fn()
        .mockReturnValueOnce(['', setStateMock])
        .mockReturnValueOnce([true, setStateMock])
        .mockReturnValueOnce(['', setStateMock])
        .mockReturnValueOnce([true, setStateMock])
    })

    it('should render the correct error when email field is blank', () => {
      render(getCredentialsModal())

      fireEvent.click(screen.getByRole('button', {
        name: 'Verify Credentials',
      }))

      const emailErrorElement = screen.getByTestId('credentials-email-input-error')
      const emailErrorText = screen.getByText(/Enter email/)

      expect(emailErrorElement).toBeInTheDocument()
      expect(emailErrorText).toBeInTheDocument()
    })

    it('should render the correct error when password field is blank', () => {
      render(getCredentialsModal())

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
      render(getCredentialsModal())
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
