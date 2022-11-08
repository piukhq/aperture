import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import {DirectoryPlanDeleteModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

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

const mockDeletePlan = jest.fn()
jest.mock('hooks/useMidManagementPlans', () => ({
  useMidManagementPlans: jest.fn().mockImplementation(() => ({
    deletePlan: mockDeletePlan,
    deletePlanIsSuccess: false,
    deletePlanError: null,
  })),
}))

const mockName = 'mock_name'
const mockNameValue = 'mock_name_value'
const mockCount = 3

const mockNewPlanInitialState = {
  directoryPlan: {
    plan_ref: null,
    plan_metadata: {
      name: mockName,
      plan_id: null,
      slug: null,
    },
    plan_counts: {
      merchants: mockCount,
      locations: mockCount,
      payment_schemes: [
        {count: mockCount},
        {count: null},
        {count: null},
      ],
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewPlanInitialState})

const getDirectoryPlanDeleteModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryPlanDeleteModal />
  </Provider>
)

describe('DirectoryPlanDeleteModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const setStateMock = jest.fn()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([mockNameValue, setStateMock])
      .mockReturnValueOnce([null, setStateMock])
  })

  it('should render the correct heading', () => {
    render(getDirectoryPlanDeleteModalComponent())
    const heading = screen.getByRole('heading', {
      name: 'Delete Plan',
    })

    expect(heading).toBeInTheDocument()
  })

  it('should render the correct copy', () => {
    render(getDirectoryPlanDeleteModalComponent())
    const firstParagraph = screen.getByText(`Are you sure you want to delete ${mockName}?`)
    const secondParagraph = screen.getByTestId('second-paragraph')
    const thirdParagraph = screen.getByText('Please enter the Plan Name to confirm.')

    expect(firstParagraph).toBeInTheDocument()
    expect(secondParagraph).toHaveTextContent(`This will also delete ${mockCount} Merchants, ${mockCount} Locations and ${mockCount} MIDs.`)
    expect(thirdParagraph).toBeInTheDocument()
  })

  it('should render the plan name input with the correct label', () => {
    render(getDirectoryPlanDeleteModalComponent())
    const input = screen.getByLabelText('Plan Name')

    expect(input).toBeInTheDocument()
  })

  it('should render the submit button with the correct label', () => {
    render(getDirectoryPlanDeleteModalComponent())
    const button = screen.getByRole('button', {
      name: 'Delete Plan',
    })

    expect(button).toBeInTheDocument()
  })

  describe('Test submit button', () => {
    it('should call the deletePlan function if matching name provided', () => {
      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockName, jest.fn()]) // matches name in the mock plan
        .mockReturnValueOnce([null, jest.fn()])

      render(getDirectoryPlanDeleteModalComponent())
      fireEvent.click(screen.getByRole('button', {
        name: 'Delete Plan',
      }))

      expect(mockDeletePlan).toHaveBeenCalled()
    })

    it('should not call the deletePlan function if name does not match', async () => {
      render(getDirectoryPlanDeleteModalComponent())
      fireEvent.click(screen.getByRole('button', {
        name: 'Delete Plan',
      }))

      expect(mockDeletePlan).not.toHaveBeenCalled()
    })
  })
})

