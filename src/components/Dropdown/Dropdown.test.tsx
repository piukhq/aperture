import React from 'react'
import {render, screen} from '@testing-library/react'
import Dropdown from 'components/Dropdown'

describe('Dropdown', () => {
  const mockLabel = 'mock_label'
  const mockDisplayValue = 'mock_display_value'
  const mockDisplayValues = [mockDisplayValue]

  const mockProps = {
    label: mockLabel,
    displayValue: mockDisplayValue,
    displayValues: mockDisplayValues,
    onChangeDisplayValue: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Test component renders', () => {
    it('should render the label and display value', () => {
      render(<Dropdown {...mockProps} />)
      expect(screen.getByText(`${mockLabel}:`)).toBeInTheDocument()
      expect(screen.getByText(mockDisplayValue)).toBeInTheDocument()
    })
  })
})
