import {fireEvent, render, screen} from '@testing-library/react'
import OptionsMenuButton from 'components/OptionsMenuButton'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('components/OptionsMenuButton/components/OptionsMenuItem', () => () => <div data-testid='mock-options-menu-item'/>)

// mock focus trap to avoid errors in tests
jest.mock('focus-trap-react', () => ({children}) => <div> {children} </div>)

const mockInitialState = {
  modal: {
    modalRequested: 'NO_MODAL',
  },
}

const mockOptionsMenuItems = [{
  label: 'mock-label',
  icon: jest.fn(),
  clickHandler: jest.fn(),
},
{
  label: 'mock-label2',
  icon: jest.fn(),
  clickHandler: jest.fn(),
}]

const mockStoreFn = configureStore([])
const store = mockStoreFn({...mockInitialState})

const getOptionsMenuButtonComponent = (passedStore = undefined) => (
  <Provider store={passedStore || store}>
    <OptionsMenuButton optionsMenuItems={mockOptionsMenuItems}/>
  </Provider>
)

describe('OptionsMenuButton', () => {
  it('should render a button with correct aria-label', () => {
    render(getOptionsMenuButtonComponent())
    const optionsButton = screen.getByLabelText('Options')

    expect(optionsButton).toBeInTheDocument()
  })

  it('should not render a menu by default', () => {
    render(getOptionsMenuButtonComponent())
    const optionsMenu = screen.queryByTestId('options-menu')

    expect(optionsMenu).not.toBeInTheDocument()
  })

  it('should render a menu with items when clicked', () => {
    render(getOptionsMenuButtonComponent())
    const optionsButton = screen.getByLabelText('Options')
    fireEvent.click(optionsButton)
    const optionsMenu = screen.getByTestId('options-menu')
    const optionsMenuItems = screen.getAllByTestId('mock-options-menu-item')

    expect(optionsMenu).toBeInTheDocument()
    expect(optionsMenuItems).toHaveLength(2)
  })
})
