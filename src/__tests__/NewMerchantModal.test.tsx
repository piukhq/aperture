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

const mockImageValue = {}
const mockNameValue = 'mock_name_value'
const mockLocationLabelValue = 'mock_location_label_value'

describe('New Merchant Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockImageValue, setStateMock])
      .mockReturnValueOnce([mockNameValue, setStateMock])
      .mockReturnValueOnce([mockLocationLabelValue, setStateMock])
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
    it('should render the Add Image input with correct label', () => {
      render(<NewMerchantModal />)
      const imageInput = screen.getByLabelText('Add Image')

      expect(imageInput).toBeInTheDocument()
    })

    it('should render the Name input with correct label', () => {
      render(<NewMerchantModal />)
      const nameInput = screen.getByLabelText('Name')

      expect(nameInput).toBeInTheDocument()
      expect(nameInput).toHaveValue(mockNameValue)
    })

    it('should render the Location Label input with correct label', () => {
      render(<NewMerchantModal />)
      const locationLabelInput = screen.getByLabelText('Location Label')

      expect(locationLabelInput).toBeInTheDocument()
      expect(locationLabelInput).toHaveValue(mockLocationLabelValue)
    })
  })
})
