import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AutosizeTextArea from 'components/AutosizeTextArea'

describe('AutosizeTextArea', () => {
  const mockButtonClickHandler = jest.fn()

  const getAutosizeTextAreaComponent = () => {
    return (
      <AutosizeTextArea buttonClickHandler={mockButtonClickHandler} />
    )
  }

  it('should render the textarea and button', () => {
    render(getAutosizeTextAreaComponent())
    expect(screen.getByTestId('textarea')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('should call the button click handler', () => {
    render(getAutosizeTextAreaComponent())
    const submitButton = screen.getByTestId('submit-button')
    fireEvent.click(submitButton)
    expect(mockButtonClickHandler).toBeCalled()
  })
})
