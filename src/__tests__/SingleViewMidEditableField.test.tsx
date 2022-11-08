import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import SingleViewMidEditableField from 'components/Modals/components/DirectorySingleViewModal/components/SingleViewMid/components/SingleViewMidDetails/components/SingleViewMidEditableField'

jest.mock('components/Dropdown', () => () => <div data-testid='dropdown' />)

const mockHeader = 'mock_header'
const mockLabel = 'mock_label'
const mockActionVerb = 'mock_action_verb'
const mockValue = 'mock_value'
const mockValidationErrorMessage = 'mock_error_message'

const mockProps = {
  label: mockLabel,
  actionVerb: mockActionVerb,
  header: mockHeader,
  value: mockValue,
  handleValueChange: jest.fn(),
  handleCancel: jest.fn(),
  handleSave: jest.fn(),
  handleDelete: jest.fn(),
  isSaving: false,
  successResponse: null,
  errorResponse: null,
  handleValidation: jest.fn(),
  validationErrorMessage: mockValidationErrorMessage,
}

const getSingleViewMidEditableField = (passedProps = {}) => (
  <SingleViewMidEditableField {...mockProps} {...passedProps} />
)

const setStateMock = jest.fn()

describe('SingleViewMidEditableField', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    React.useState = jest
      .fn()
      .mockReturnValueOnce([false, setStateMock]) // isInEditState
      .mockReturnValueOnce([false, setStateMock]) // isInDeleteState
      .mockReturnValueOnce([null, setStateMock]) // validationError
  })

  describe('Test read-only state', () => {
    it('should render the correct header and value', () => {
      render(getSingleViewMidEditableField())
      expect(screen.getByText(mockHeader)).toBeInTheDocument()
      expect(screen.getByText(mockValue)).toBeInTheDocument()
    })

    it('should render the correct buttons', () => {
      render(getSingleViewMidEditableField())
      expect(screen.getByRole('button', {name: 'Edit'})).toBeInTheDocument()
      expect(screen.getByRole('button', {name: `${mockActionVerb} ${mockLabel}`})).toBeInTheDocument()
    })
  })

  describe('Test edit state', () => {
    const setValidationErrorStateMock = jest.fn()
    beforeEach(() => {
      jest.clearAllMocks()

      React.useState = jest
        .fn()
        .mockReturnValueOnce([true, setStateMock]) // isInEditState
        .mockReturnValueOnce([false, setStateMock]) // isInDeleteState
        .mockReturnValueOnce([null, setValidationErrorStateMock]) // validationError
    })

    describe('Test input field', () => {
      it('should render the correct label and input field with the correct value', () => {
        render(getSingleViewMidEditableField())

        expect(screen.getByText(mockLabel)).toBeInTheDocument()
        const input = screen.getByLabelText(mockLabel)
        expect(input).toBeInTheDocument()
        expect(input).toHaveProperty('autofocus')
        expect(input).toHaveValue(mockValue)
      })

      it('should render the correct buttons', () => {
        render(getSingleViewMidEditableField())
        expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument()
        expect(screen.getByRole('button', {name: `Close ${mockLabel} edit`})).toBeInTheDocument()
      })

      describe('Test save validation', () => {
        it('should fail validation when non-numeric value is entered', () => {
          const mockValidationFunc = jest.fn().mockImplementation(() => false)
          render(getSingleViewMidEditableField({...mockProps, handleValidation: mockValidationFunc}))

          fireEvent.click(screen.getByRole('button', {
            name: 'Save',
          }))

          expect(setValidationErrorStateMock).toBeCalledWith(mockValidationErrorMessage)
        })

        it('should pass validation when numeric value is entered', () => {
          const mockValidationFunc = jest.fn().mockImplementation(() => true)
          render(getSingleViewMidEditableField({...mockProps, handleValidation: mockValidationFunc}))

          fireEvent.click(screen.getByRole('button', {
            name: 'Save',
          }))

          expect(setValidationErrorStateMock).not.toBeCalled()
        })
      })

      describe('Test saving state', () => {
        it('should render the input field with the correct value', () => {
          render(getSingleViewMidEditableField({...mockProps, isSaving: true}))

          const input = screen.getByLabelText(mockLabel)
          expect(input).toBeInTheDocument()
          expect(input).toHaveProperty('autofocus')
          expect(input).toHaveValue(mockValue)
        })

        it('should render the disabled saving button with the correct label', () => {
          render(getSingleViewMidEditableField({...mockProps, isSaving: true}))
          const savingButton = screen.getByRole('button', {name: 'Saving'})

          expect(savingButton).toBeInTheDocument()
          expect(savingButton).toBeDisabled()
        })
      })
    })

    describe('Test Dropdown', () => {
      it('should render the Dropdown component', () => {
        render(getSingleViewMidEditableField({dropdownValues: []}))
        expect(screen.getByTestId('dropdown')).toBeInTheDocument()
      })
    })
  })

  describe('Test delete state', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      const setStateMock = jest.fn()

      React.useState = jest
        .fn()
        .mockReturnValueOnce([false, setStateMock]) // isInEditState
        .mockReturnValueOnce([true, setStateMock]) // isInDeleteState
        .mockReturnValueOnce([null, setStateMock]) // validationError
    })

    it('should render the delete confirmation message', () => {
      render(getSingleViewMidEditableField())
      expect(screen.getByText(`Are you sure you want to ${mockActionVerb} this ${mockLabel}?`)).toBeInTheDocument()
    })

    it('should render the correct buttons', () => {
      render(getSingleViewMidEditableField())
      expect(screen.getByRole('button', {name: `Close ${mockLabel} ${mockActionVerb} confirmation`})).toBeInTheDocument()
      expect(screen.getByRole('button', {name: `${mockActionVerb} ${mockLabel} confirmation`})).toBeInTheDocument()
    })
  })
})


