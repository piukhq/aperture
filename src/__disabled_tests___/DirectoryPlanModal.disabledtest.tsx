import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryPlanModal} from 'components'

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
const mockPlanIdValue = 'mock_plan_id_value'
const mockSlugValue = 'mock_slug_value'

describe('New Plan Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockImageValue, setStateMock])
      .mockReturnValueOnce([mockNameValue, setStateMock])
      .mockReturnValueOnce([mockPlanIdValue, setStateMock])
      .mockReturnValueOnce([mockSlugValue, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
  })

  it('should render the correct Heading', () => {
    render(<NewPlanModal />)
    const heading = screen.getByRole('heading', {
      name: 'New Plan',
    })

    expect(heading).toBeInTheDocument()
  })

  it('should render the Add Plan button', () => {
    render(<NewPlanModal />)
    const addPlanButton = screen.getByRole('button', {
      name: 'Add Plan',
    })

    expect(addPlanButton).toBeInTheDocument()
  })

  describe('Test Input Fields', () => {
    it('should render the Add Image input with correct label', () => {
      render(<NewPlanModal />)
      const imageInput = screen.getByLabelText('Add Image')

      expect(imageInput).toBeInTheDocument()
    })

    it('should render the Name input with correct label', () => {
      render(<NewPlanModal />)
      const nameInput = screen.getByLabelText('Name')

      expect(nameInput).toBeInTheDocument()
      expect(nameInput).toHaveValue(mockNameValue)
    })

    it('should render the Plan ID input with correct label', () => {
      render(<NewPlanModal />)
      const planIdInput = screen.getByLabelText('Plan ID')

      expect(planIdInput).toBeInTheDocument()
      expect(planIdInput).toHaveValue(mockPlanIdValue)
    })

    it('should render the Slug input with correct label', () => {
      render(<NewPlanModal />)
      const slugInput = screen.getByLabelText('Slug')

      expect(slugInput).toBeInTheDocument()
      expect(slugInput).toHaveValue(mockSlugValue)
    })
  })
})
