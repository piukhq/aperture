import {fireEvent, render, screen} from '@testing-library/react'
import OptionsMenuButton from 'components/OptionsMenuButton'

const mockChildren = (
  <>
    <div data-testid='mock-child'/>
    <div data-testid='mock-child'/>
    <div data-testid='mock-child'/>
  </>
)

describe('OptionsMenuButton', () => {
  it('should render a button with correct aria-label', () => {
    render(<OptionsMenuButton>{mockChildren}</OptionsMenuButton>)
    const optionsButton = screen.getByLabelText('Options')

    expect(optionsButton).toBeInTheDocument()
  })

  it('should not render a menu by default', () => {
    render(<OptionsMenuButton>{mockChildren}</OptionsMenuButton>)
    const optionsMenu = screen.queryByTestId('options-menu')

    expect(optionsMenu).not.toBeInTheDocument()
  })

  it('should render a menu with children when clicked', () => {
    render(<OptionsMenuButton>{mockChildren}</OptionsMenuButton>)
    const optionsButton = screen.getByLabelText('Options')
    fireEvent.click(optionsButton)
    const optionsMenu = screen.getByTestId('options-menu')
    const optionsMenuItems = screen.getAllByTestId('mock-child')

    expect(optionsMenu).toBeInTheDocument()
    expect(optionsMenuItems).toHaveLength(3)
  })
})
