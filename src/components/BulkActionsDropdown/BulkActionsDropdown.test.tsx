import BulkActionsDropdown from 'components/BulkActionsDropdown'
import {render, screen} from '@testing-library/react'

const mockProps = {
  actionsMenuItems: [
    {
      label: 'label',
      handleClick: jest.fn(),
      buttonStyle: 'buttonStyle',
    },
    {
      label: 'label2',
      handleClick: jest.fn(),
      buttonStyle: 'buttonStyle',
    },
  ],
}

describe('BulkActionsDropdown', () => {
  it('should render a dropdown', () => {
    render(<BulkActionsDropdown {...mockProps}/>)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should render a dropdown with the correct number of options', () => {
    render(<BulkActionsDropdown {...mockProps}/>)
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })
})

