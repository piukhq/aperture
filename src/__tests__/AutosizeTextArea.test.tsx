import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AutosizeTextArea from 'components/AutosizeTextArea'

describe('AutosizeTextArea', () => {
  const mockButtonClickHandler = jest.fn()

  const getAutosizeTextAreaComponent = () => {
    return (
      <AutosizeTextArea accessibilityLabel='' placeholder='' submitHandler={mockButtonClickHandler} />
    )
  }

  it('should render the textarea and button', () => {
    render(getAutosizeTextAreaComponent())
    expect(screen.getByTestId('textarea')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  describe('Test submit handler', () => {

    describe('Test valid input', () => {
      beforeEach(() => {
        jest.clearAllMocks()
        React.useState = jest.fn()
          .mockReturnValueOnce(['valid input', jest.fn()]) // value
          .mockReturnValueOnce([null, jest.fn()]) // inputValidationError
      })

      it('should call the button click handler', () => {
        render(getAutosizeTextAreaComponent())
        const submitButton = screen.getByTestId('submit-button')
        fireEvent.click(submitButton)
        expect(mockButtonClickHandler).toBeCalled()
      })
    })

    describe('Test invalid input', () => {
      const mockInputError = 'mock_input_error'
      beforeEach(() => {
        jest.clearAllMocks()
        React.useState = jest.fn()
          .mockReturnValueOnce(['', jest.fn()]) // value
          .mockReturnValueOnce([mockInputError, jest.fn()]) // inputValidationError
      })

      it('should not call the button click handler', () => {
        render(getAutosizeTextAreaComponent())
        const submitButton = screen.getByTestId('submit-button')
        fireEvent.click(submitButton)
        expect(mockButtonClickHandler).not.toBeCalled()
      })

      it('should display the validation error', () => {
        render(getAutosizeTextAreaComponent())
        const submitButton = screen.getByTestId('submit-button')
        fireEvent.click(submitButton)
        expect(screen.getByTestId('input-error')).toBeInTheDocument()
        expect(screen.getByText(mockInputError)).toBeInTheDocument()
      })
    })
  })
})
