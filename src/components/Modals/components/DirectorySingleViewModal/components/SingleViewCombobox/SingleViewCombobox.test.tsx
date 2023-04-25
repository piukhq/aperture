import React from 'react'
import {render, screen} from '@testing-library/react'
import SingleViewCombobox from './SingleViewCombobox'

describe('SingleViewCombobox', () => {
  const mockProps = {
    selectedEntity: 'mock_selected_entity',
    availableEntities: ['mock_available_entity_1', 'mock_available_entity_2'],
    entityValueFn: jest.fn(),
    entityPaymentSchemeSlugFn: jest.fn(),
    onChangeFn: jest.fn(),
    shouldRenderPaymentCardIcon: true,
    entityLabel: 'mockEntityLabel',
    isDisabled: false,
  }

  describe('Test component renders', () => { // Limited tests as it is mostly Headless UI code
    it('should render an input with the correct placeholder', () => {
      render(<SingleViewCombobox {...mockProps} />)

      expect(screen.getByPlaceholderText('Select mockEntityLabel')).toBeInTheDocument()
    })
  })
})
