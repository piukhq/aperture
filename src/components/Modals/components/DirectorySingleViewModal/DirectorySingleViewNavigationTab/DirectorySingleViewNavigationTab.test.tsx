import {render, screen} from '@testing-library/react'
import {DirectorySingleViewTabs} from 'utils/enums'
import DirectorySingleViewNavigationTab from './DirectorySingleViewNavigationTab'


const mockProps = {
  tab: DirectorySingleViewTabs.DETAILS,
  tabSelected: DirectorySingleViewTabs.DETAILS,
  setTabSelectedFn: jest.fn(),
  isEntityFound: true,
}

describe('DirectorySingleViewNavigationTab', () => {
  it('should render the navigation tab as a button', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render the navigation tab with the correct label', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} />)
    expect(screen.getByRole('button', {name: DirectorySingleViewTabs.DETAILS})).toBeInTheDocument()
  })

  it('should render the selected tab with the correct styles', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} />)
    expect(screen.getByRole('button', {name: DirectorySingleViewTabs.DETAILS})).toHaveClass('border-b-blue')
  })

  it('should render the unselected tab with the correct styles', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} tab={DirectorySingleViewTabs.COMMENTS} />)
    expect(screen.getByRole('button', {name: DirectorySingleViewTabs.COMMENTS})).toHaveClass('border-b-grey-200')
  })

  it('should not be disabled if the entity is found', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} />)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should be enabled if the entity is not found but is Details tab', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} isEntityFound={false} />)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should be enabled if the entity is not found but is the Comments tab', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} isEntityFound={false} tab={DirectorySingleViewTabs.COMMENTS} />)
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should be disabled if the entity is not found but is any other tab', () => {
    render(<DirectorySingleViewNavigationTab {...mockProps} isEntityFound={false} tab={DirectorySingleViewTabs.LOCATIONS} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
