import React from 'react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {fireEvent, render, screen} from '@testing-library/react'
import HarmoniaStatus from 'components/Modals/components/DirectorySingleViewModal/components/HarmoniaStatus'

const mockTxmStatus = 'onboarded'
const mockIsOnboardingLoading = false
const mockIsOnboardingSuccess = false
const mockIsOffboardingLoading = false
const mockIsOffboardingSuccess = false
const mockOffboardEntityFn = jest.fn()
const mockOnboardEntityFn = jest.fn()

const mockProps = {
  txmStatus: mockTxmStatus,
  shouldRefresh: false,
  setShouldRefresh: jest.fn(),
  isOnboardingLoading: mockIsOnboardingLoading,
  isOnboardingSuccess: mockIsOnboardingSuccess,
  isOffboardingLoading: mockIsOffboardingLoading,
  isOffboardingSuccess: mockIsOffboardingSuccess,
  isDisabled: false,
  offboardEntityFn: mockOffboardEntityFn,
  onboardEntityFn: mockOnboardEntityFn,
}

const mockStoreFn = configureStore([])

const store = mockStoreFn({
})

const getHarmoniaStatusComponent = (passedStore = undefined, passedProps = {}) => (
  <Provider store={passedStore || store}>
    <HarmoniaStatus {...mockProps} {...passedProps}/>
  </Provider>
)


describe('Test Harmonia Status', () => {
  it('should render the Harmonia Status heading', () => {
    render(getHarmoniaStatusComponent())
    expect(screen.getByRole('heading')).toHaveTextContent('HARMONIA STATUS')
  })

  describe('Test Onboarded status', () => {
    it('should render the correct Harmonia Status value', () => {
      render(getHarmoniaStatusComponent())
      expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Onboarded')
    })

    it('should render the offboard button', () => {
      render(getHarmoniaStatusComponent())
      expect(screen.getByRole('button', {name: 'Offboard'})).toBeInTheDocument()
    })

    it('should call the postOffboarding function when clicked', () => {
      render(getHarmoniaStatusComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Offboard'}))
      expect(mockOffboardEntityFn).toHaveBeenCalled()
    })
  })

  describe('Test Not Onboarded status', () => {
    it('should render the Not Onboarded Harmonia Status value', () => {
      mockProps.txmStatus = 'not_onboarded'
      render(getHarmoniaStatusComponent())
      expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Not Onboarded')
    })

    it('should render the onboard button', () => {
      render(getHarmoniaStatusComponent())
      expect(screen.getByRole('button', {name: 'Onboard'})).toBeInTheDocument()
    })

    it('should call the postOnboarding function when clicked', () => {
      render(getHarmoniaStatusComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Onboard'}))
      expect(mockOnboardEntityFn).toHaveBeenCalled()
    })
  })

  describe('Test Offboarded status', () => {
    it('should render the Offboarded Harmonia Status value', () => {
      mockProps.txmStatus = 'offboarded'
      render(getHarmoniaStatusComponent())
      expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Offboarded')
    })

    it('should render the onboard button', () => {
      render(getHarmoniaStatusComponent())
      expect(screen.getByRole('button', {name: 'Onboard'})).toBeInTheDocument()
    })

    it('should call the postOnboarding function when clicked', () => {
      render(getHarmoniaStatusComponent())
      fireEvent.click(screen.getByRole('button', {name: 'Onboard'}))
      expect(mockOnboardEntityFn).toHaveBeenCalled()
    })
  })

  describe('Test Onboarding status', () => {
    it('should render the correct Harmonia Status value', () => {
      mockProps.txmStatus = 'onboarding'
      render(getHarmoniaStatusComponent())
      expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Onboarding')
    })

    it('should render the disabled Onboarding button', () => {
      render(getHarmoniaStatusComponent(undefined, {
        shouldRefresh: true,
        isOnboardingLoading: true,
        isOffboardingLoading: false,
        isOffboardingSuccess: false,
      }))
      expect(screen.getByRole('button', {name: 'Onboarding...'})).toBeDisabled()
    })
  })

  describe('Test Offboarding status', () => {
    it('should render the correct Harmonia Status value', () => {
      mockProps.txmStatus = 'offboarding'
      render(getHarmoniaStatusComponent())
      expect(screen.getByTestId('harmonia-status')).toHaveTextContent('Offboarding')
    })

    it('should render the disabled onboarding button', () => {
      render(getHarmoniaStatusComponent(undefined, {
        shouldRefresh: true,
        isOffboardingLoading: true,
        isOnboardingLoading: false,
        isOnboardingSuccess: false,
      }))
      expect(screen.getByRole('button', {name: 'Onboarding...'})).toBeDisabled()
    })
  })
})

