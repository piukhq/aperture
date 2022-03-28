import {render, screen} from '@testing-library/react'
import VerificationTag from 'components/CredentialsModal/components/VerificationTag'

describe('VerificationTag', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test Non-Verified Tag Statuses', () => {
    const mockNonVerifiedVerificationTagProps = {
      envKey: 'mockEnvironment',
      hasVerificationToken: false,
      removeVerificationToken: jest.fn().mockImplementation(() => null),
    }

    it('should render Failed status tag', () => {
      render(<VerificationTag isFailure isPending={false} {...mockNonVerifiedVerificationTagProps}/>)
      const tagLabel = screen.getByTestId('tag-label')

      expect(tagLabel).toHaveTextContent('Failed')
    })

    it('should render Pending status tag', () => {
      render(<VerificationTag isFailure={false} isPending {...mockNonVerifiedVerificationTagProps}/>)
      const tagLabel = screen.getByTestId('tag-label')

      expect(tagLabel).toHaveTextContent('Pending')
    })

    it('should render Unverified status tag', () => {
      render(<VerificationTag isFailure={false} isPending={false} {...mockNonVerifiedVerificationTagProps}/>)
      const tagLabel = screen.getByTestId('tag-label')

      expect(tagLabel).toHaveTextContent('Unverified')
    })
  })

  describe('Test Verified Tag', () => {
    const mockVerifiedVerificationTagProps = {
      isPending: false,
      isFailure: false,
      envKey: 'mockEnvironment',
      hasVerificationToken: true,
      removeVerificationToken: jest.fn(),
    }

    it('should render Verified status tag', () => {
      render(<VerificationTag {...mockVerifiedVerificationTagProps}/>)
      const tagLabel = screen.getByTestId('tag-label')

      expect(tagLabel).toHaveTextContent('Verified')
    })
    it('should render Remove Credentials button with correct label', () => {
      render(<VerificationTag {...mockVerifiedVerificationTagProps}/>)
      const removeCredentialsButton = screen.getByRole('button', {
        name: 'Remove Credentials',
      })

      expect(removeCredentialsButton).toBeInTheDocument()
    })

  })
})
