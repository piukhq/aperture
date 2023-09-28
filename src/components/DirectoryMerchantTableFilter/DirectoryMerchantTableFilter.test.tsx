import {render, screen} from '@testing-library/react'
import DirectoryMerchantTableFilter from './DirectoryMerchantTableFilter'

const mockProps = {
  isActive: true,
  filterFn: jest.fn(),
  setFilteredList: jest.fn(),
  textFilterValue: 'mock_text_filter_value',
  setTextFilterValue: jest.fn(),
}

const getDirectoryMerchantTableFilterComponent = (passedProps = {}) => {
  return <DirectoryMerchantTableFilter {...mockProps}{...passedProps} />
}

describe('DirectoryMerchantTableFilter', () => {
  it('should render the correct text input placeholder', () => {
    render(getDirectoryMerchantTableFilterComponent())
    expect(screen.getByPlaceholderText('Filter by text..')).toBeInTheDocument()
  })

  it('should render the correct text input value', () => {
    render(getDirectoryMerchantTableFilterComponent())
    expect(screen.getByDisplayValue('mock_text_filter_value')).toBeInTheDocument()
  })

  it('should disable the tet input when isActive is false', () => {
    render(getDirectoryMerchantTableFilterComponent({isActive: false}))
    expect(screen.getByPlaceholderText('Filter by text..')).toBeDisabled()
  })
})
