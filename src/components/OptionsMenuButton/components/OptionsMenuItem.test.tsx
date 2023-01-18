import {fireEvent, render, screen} from '@testing-library/react'
import OptionsMenuItem from 'components/OptionsMenuButton/components/OptionsMenuItem'

const mockHandleClick = jest.fn()
const mockIcon = <div data-testid='mock-icon' />
const mockLabel = 'mock-options-menu-item'

const OptionsMenuComponent = <OptionsMenuItem handleClick={mockHandleClick} icon={mockIcon} label={mockLabel}/>

describe('OptionsMenuItem', () => {
  it('should render a button', () => {
    render(OptionsMenuComponent)
    const item = screen.getByRole('button')

    expect(item).toBeInTheDocument()
  })

  it('should render the correct label and icon', () => {
    render(OptionsMenuComponent)
    const label = screen.getByText(mockLabel)
    const icon = screen.getByTestId('mock-icon')

    expect(label).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('should call the correct function when clicked', () => {
    render(OptionsMenuComponent)

    const item = screen.getByRole('button')
    fireEvent.click(item)

    expect(mockHandleClick).toBeCalled()
  })

  it('should not have the text-red class', () => {
    render(OptionsMenuComponent)
    const item = screen.getByRole('button')

    expect(item).not.toHaveClass('text-red')
  })

  describe('Test isRed Property', () => {
    it('should have the text-red class', () => {
      render(<OptionsMenuItem isRed handleClick={mockHandleClick} icon={mockIcon} label={mockLabel}/>)
      const item = screen.getByRole('button')

      expect(item).toHaveClass('text-red')
    })
  })
})
