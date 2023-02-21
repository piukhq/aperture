// Left out tests around match algorithm as likely to change in future

import React from 'react'
import {render, screen} from '@testing-library/react'
import CategoryDetails from './CategoryDetails'
import {capitaliseFirstLetter} from 'utils/stringFormat'

const mockPlan = {
  account: {
    plan_name: 'mock_plan_name',
    add_fields: [],
    authorise_fields: [],
    category: 'mock_category',
    company_name: 'mock_company_name',
    company_url: 'mock_company_url',
    enrol_fields: [],
    fees: [],
    plan_documents: [],
    plan_url: 'mock_plan_url',
    registration_fields: [],
    tiers: [],
  },
  id: 1234,
  balances: [],
  feature_set: {
    card_type: 'mock-card_type',
  },
  card: {},
  uid: 'mock_uid',
  status: 'mock_uid',
  images: [
    {
      type: 1,
      url: 'https://mock-hero-url',
      id: 1,
      encoding: '',
      description: '',
    },
  ],
  slug: 'mock-slug',
}

const mockIsValueMatchedAcrossEnvsFn = jest.fn().mockReturnValue(false)

const mockProps = {
  hasNoCategoryValues: false,
  hasAllCategoryValuesMatching: false,
  category: 'account',
  categoryAcrossEnvsArray: [],
  mostKeysCategory: ['account'],
  categoryWithMostKeysAcrossEnvs: 'account',
  plans: {
    dev: mockPlan,
    staging: mockPlan,
    prod: mockPlan,
  },
  isValueMatchedAcrossEnvsFn: mockIsValueMatchedAcrossEnvsFn,
  totalMatchingCategoryValues: 2,
}

const getCategoryDetailsComponent = (props = {}) => {
  return <CategoryDetails {...mockProps} {...props} />
}

describe('Test Category Details', () => {
  it('should render the category name in  the summary', () => {
    render(getCategoryDetailsComponent())
    expect(screen.getByText(capitaliseFirstLetter(mockProps.category))).toBeInTheDocument()
  })

  describe('Test fully-matched category', () => {

    it('should render the correct category summary information', () => {
      render(getCategoryDetailsComponent({hasAllCategoryValuesMatching: true}))
      expect(screen.getByText('(fully matched)')).toBeInTheDocument()
    })

    it('should render the correct category details header', () => {
      render(getCategoryDetailsComponent({hasAllCategoryValuesMatching: true}))
      expect(screen.getByText(`${capitaliseFirstLetter(mockProps.category)} has ${mockProps.mostKeysCategory.length} matching propert${mockProps.mostKeysCategory.length === 1 ? 'y' : 'ies'} across all logged-in environments`)).toBeInTheDocument()
    })

  })


  describe('Test Category with no keys', () => {
    it('should render the correct category summary information', () => {
      render(getCategoryDetailsComponent({hasNoCategoryValues: true}))
      expect(screen.getByText('(unused)')).toBeInTheDocument()
    })

    it('should render the correct category details header', () => {
      render(getCategoryDetailsComponent({hasNoCategoryValues: true}))
      expect(screen.getByText('No environments use this category')).toBeInTheDocument()
    })
  })

  describe('Test Category with mismatches', () => {
    it('should render the correct category summary information', () => {
      render(getCategoryDetailsComponent())

      expect(screen.getByText(`(${mockProps.totalMatchingCategoryValues} matches out of ${mockProps.mostKeysCategory.length})`)).toBeInTheDocument()
    })

    it('should render the correct category details header', () => {
      render(getCategoryDetailsComponent())
      expect(screen.getByText('Mismatched Values:')).toBeInTheDocument()
    })

    describe('Test mismatched category value', () => {
      it('should render the mismatched values key', () => {
        render(getCategoryDetailsComponent())

        expect(screen.getByText('account')).toBeInTheDocument()
      })
    })
  })
})
