import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {DirectoryPlanModal} from 'components/Modals'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/Modal', () => ({
  __esModule: true,
  default ({modalHeader, children}: Record<string, React.ReactNode>) {
    return (
      <div>
        <h1>{modalHeader}</h1>
        {children}
      </div>
    )
  },
}))

jest.mock('hooks/useDirectoryPlans', () => ({
  useDirectoryPlans: jest.fn().mockImplementation(() => ({
    postPlan: jest.fn(),
    postPlanResponse: null,
    postPlanError: null,
  })),
}))

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
      .mockReturnValueOnce([null, setStateMock])
      .mockReturnValueOnce(['', setStateMock])
      .mockReturnValueOnce(['', setStateMock])
      .mockReturnValueOnce(['', setStateMock])
      .mockReturnValueOnce([null, setStateMock])
      .mockReturnValueOnce([null, setStateMock])
      .mockReturnValueOnce([null, setStateMock])
      .mockReturnValueOnce([false, setStateMock])
  })

  describe('Test Edit Plan specifics', () => {
    const mockImageValue = {}
    const mockNameValue = 'mock_name_value'
    const mockPlanIdValue = 'mock_plan_id_value'
    const mockSlugValue = 'mock_slug_value'

    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()

      React.useState = jest
        .fn()
        .mockReturnValueOnce([mockImageValue, setStateMock])
        .mockReturnValueOnce([mockNameValue, setStateMock])
        .mockReturnValueOnce([mockPlanIdValue, setStateMock])
        .mockReturnValueOnce([mockSlugValue, setStateMock])
        .mockReturnValueOnce([null, setStateMock])
        .mockReturnValueOnce([null, setStateMock])
        .mockReturnValueOnce([null, setStateMock])
        .mockReturnValueOnce([false, setStateMock])
    })

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

    describe('Test error scenarios', () => {
      const mockNameErrorMessage = 'mock_name_error'
      const mockPlanIdErrorMessage = 'mock_plan_id_error'
      const mockSlugErrorMessage = 'mock_slug_error' // contains invalid underscore characters

      beforeEach(() => {
        jest.clearAllMocks()
        const setStateMock = jest.fn()

        React.useState = jest
          .fn()
          .mockReturnValueOnce([null, setStateMock])
          .mockReturnValueOnce(['', setStateMock])
          .mockReturnValueOnce(['', setStateMock])
          .mockReturnValueOnce(['', setStateMock])
          .mockReturnValueOnce([mockNameErrorMessage, setStateMock])
          .mockReturnValueOnce([mockPlanIdErrorMessage, setStateMock])
          .mockReturnValueOnce([mockSlugErrorMessage, setStateMock])
          .mockReturnValueOnce([false, setStateMock])
      })

      it('should render name field error message', () => {
        render(getDirectoryPlanModalComponent())

        fireEvent.click(screen.getByRole('button', {
          name: 'Add Plan',
        }))

        const nameErrorElement = screen.getByTestId('plan-name-input-error')
        const nameErrorText = screen.getByText(mockNameErrorMessage)

        expect(nameErrorElement).toBeInTheDocument()
        expect(nameErrorText).toBeInTheDocument()
      })

      it('should render plan ID field error message', () => {
        render(getDirectoryPlanModalComponent())

        fireEvent.click(screen.getByRole('button', {
          name: 'Add Plan',
        }))

        const planIdErrorElement = screen.getByTestId('plan-id-input-error')
        const planIdErrorText = screen.getByText(mockPlanIdErrorMessage)

        expect(planIdErrorElement).toBeInTheDocument()
        expect(planIdErrorText).toBeInTheDocument()
      })

      it('should render slug field error message', () => {
        render(getDirectoryPlanModalComponent())

        fireEvent.click(screen.getByRole('button', {
          name: 'Add Plan',
        }))

        const slugErrorElement = screen.getByTestId('plan-slug-input-error')
        const slugErrorText = screen.getByText(mockSlugErrorMessage)

        expect(slugErrorElement).toBeInTheDocument()
        expect(slugErrorText).toBeInTheDocument()
      })
    })
  })
})
