import React from 'react'
import {render, screen} from '@testing-library/react'

import {NewMerchantModal} from 'components'

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
// TODO: Fix for Next/Image bug when using local image file.
// eslint-disable-next-line @next/next/no-img-element
jest.mock('next/image', () => ({src, alt}) => <img src={src} alt={alt} />
)

const mockImageValue = {}
const mockNameValue = 'mock_name_value'
const mockSlugValue = 'mock_slug_value'
const mockSchemeIdValue = 'mock_scheme_id_value'
const mockLocationLabelValue = 'mock_location_label_value'

describe('New Merchant Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockImageValue, setStateMock])
      .mockReturnValueOnce([mockNameValue, setStateMock])
      .mockReturnValueOnce([mockSlugValue, setStateMock])
      .mockReturnValueOnce([mockSchemeIdValue, setStateMock])
      .mockReturnValueOnce([mockLocationLabelValue, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])

  })

  it('should render the correct Heading', () => {
    render(<NewMerchantModal />)
    const heading = screen.getByRole('heading', {
      name: 'New Merchant',
    })

    expect(heading).toBeInTheDocument()
  })

  it('should render the Add Merchant button', () => {
    render(<NewMerchantModal />)
    const addMerchantButton = screen.getByRole('button', {
      name: 'Add Merchant',
    })

    expect(addMerchantButton).toBeInTheDocument()
  })

  describe('Test Input Fields', () => {
    it('should render the Name input with correct label', () => {
      render(<NewMerchantModal />)

      const nameInput = screen.getByLabelText('Name')
      expect(nameInput).toBeInTheDocument()
      expect(nameInput).toHaveValue(mockNameValue)
    })

    it('should render the Slug input with correct label', () => {
      render(<NewMerchantModal />)

      const slugInput = screen.getByLabelText('Slug')
      expect(slugInput).toBeInTheDocument()
      expect(slugInput).toHaveValue(mockSlugValue)
    })

    it('should render the Scheme Id input with correct label', () => {
      render(<NewMerchantModal />)

      const schemeIdInput = screen.getByLabelText('Django Scheme Id')
      expect(schemeIdInput).toBeInTheDocument()
      expect(schemeIdInput).toHaveValue(mockSchemeIdValue)
    })

    it('should render the Location Label input with correct label', () => {
      render(<NewMerchantModal />)

      const locationLabelInput = screen.getByLabelText('Location Label')
      expect(locationLabelInput).toBeInTheDocument()
      expect(locationLabelInput).toHaveValue(mockLocationLabelValue)
    })
  })
})
