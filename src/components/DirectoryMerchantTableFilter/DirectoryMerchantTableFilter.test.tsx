import {render, screen} from '@testing-library/react'
import DirectoryMerchantTableFilter from './DirectoryMerchantTableFilter'

const mockProps = {
  isActive: true,
  filterFn: jest.fn(),
  setFilteredList: jest.fn(),
  textFilterValue: 'mock_text_filter_value',
  setTextFilterValue: jest.fn(),
  setHasDateFilter: jest.fn(),
  resetSortingFn: jest.fn(),
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

  it('should disable the text input when isActive is false', () => {
    render(getDirectoryMerchantTableFilterComponent({isActive: false}))
    expect(screen.getByPlaceholderText('Filter by text..')).toBeDisabled()
  })

  it('should render the date from input', () => {
    render(getDirectoryMerchantTableFilterComponent())
    expect(screen.getByLabelText('Date from:')).toBeInTheDocument()
  })

  it('should render the date to input', () => {
    render(getDirectoryMerchantTableFilterComponent())
    expect(screen.getByLabelText('Date to:')).toBeInTheDocument()
  })

  it('should render the clear filters button', () => {
    render(getDirectoryMerchantTableFilterComponent())
    expect(screen.getByRole('button', {name: 'Clear Filters'})).toBeInTheDocument()
  })

  it('should disable the clear filters button when no filters have been applied', () => {
    render(getDirectoryMerchantTableFilterComponent({textFilterValue: ''}))
    expect(screen.getByRole('button', {name: 'Clear Filters'})).toBeDisabled()
  })

  it('should enable the clear filters button when filters have been applied', () => {
    render(getDirectoryMerchantTableFilterComponent({textFilterValue: 'mock_text_filter_value'}))
    expect(screen.getByRole('button', {name: 'Clear Filters'})).toBeEnabled()
  })
})
