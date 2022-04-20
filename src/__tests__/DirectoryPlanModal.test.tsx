import React from 'react'
import {render, screen} from '@testing-library/react'
import {DirectoryPlanModal} from 'components'
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

const mockImageValue = {}
const mockNameValue = 'mock_name_value'
const mockPlanIdValue = 'mock_plan_id_value'
const mockSlugValue = 'mock_slug_value'

const mockNewPlanInitialState = {
  directoryPlan: {
    plan_ref: null,
    plan_metadata: {
      name: null,
      plan_id: null,
      slug: null,
    },
  },
}

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockNewPlanInitialState})

const getDirectoryPlanModalComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <DirectoryPlanModal />
  </Provider>
)

describe('DirectoryPlanModal', () => {
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

  it('should render the Add Image input with correct label', () => {
    render(getDirectoryPlanModalComponent())
    const imageInput = screen.getByLabelText('Add Image')

    expect(imageInput).toBeInTheDocument()
  })

  it('should render the Name input with correct label', () => {
    render(getDirectoryPlanModalComponent())
    const nameInput = screen.getByLabelText('Name')

    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toHaveValue(mockNameValue)
  })

  it('should render the Plan ID input with correct label', () => {
    render(getDirectoryPlanModalComponent())
    const planIdInput = screen.getByLabelText('Plan ID')

    expect(planIdInput).toBeInTheDocument()
    expect(planIdInput).toHaveValue(mockPlanIdValue)
  })

  it('should render the Slug input with correct label', () => {
    render(getDirectoryPlanModalComponent())
    const slugInput = screen.getByLabelText('Slug')

    expect(slugInput).toBeInTheDocument()
    expect(slugInput).toHaveValue(mockSlugValue)
  })

  describe('Test New Plan specifics', () => {
    it('should render the correct Heading', () => {
      render(getDirectoryPlanModalComponent())
      const heading = screen.getByRole('heading', {
        name: 'New Plan',
      })

      expect(heading).toBeInTheDocument()
    })

    it('should render the Add Plan button', () => {
      render(getDirectoryPlanModalComponent())
      const addPlanButton = screen.getByRole('button', {
        name: 'Add Plan',
      })

      expect(addPlanButton).toBeInTheDocument()
    })

    describe('Test Edit Plan specifics', () => {

      const mockEditPlanInitialState = {
        directoryPlan: {
          plan_ref: 'mock_ref',
          plan_metadata: {
            name: null,
            plan_id: null,
            slug: null,
          },
        },
      }

      const editPlanStore = mockStoreFn({...mockEditPlanInitialState})

      it('should render the correct Heading', () => {
        render(getDirectoryPlanModalComponent(editPlanStore))
        const heading = screen.getByRole('heading', {
          name: 'Edit Plan',
        })

        expect(heading).toBeInTheDocument()
      })

      it('should render the Save Changes button', () => {
        render(getDirectoryPlanModalComponent(editPlanStore))
        const submitButton = screen.getByRole('button', {
          name: 'Save Changes',
        })

        expect(submitButton).toBeInTheDocument()
      })
    })
  })


})
