import React from 'react'

import {SelectedPlans} from 'types'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import compare from 'just-compare'

type Props = {
  plans: SelectedPlans
}

enum PlanCategory {
  ACCOUNT = 'account',
  BALANCES = 'balances',
  CARD = 'card',
  CONTENT = 'content',
  FEATURE_SET = 'feature_set',
  IMAGES = 'images',
}

const PlanComparator = ({plans}: Props) => {
  const {dev, staging, prod} = plans


  const plansArray = [] // TODO: Temp check for multiple plans
  dev && plansArray.push(dev)
  staging && plansArray.push(staging)
  prod && plansArray.push(prod)

  const planCategories = [
    PlanCategory.ACCOUNT,
    PlanCategory.CARD,
    PlanCategory.CONTENT,
    PlanCategory.FEATURE_SET,
    PlanCategory.IMAGES,
  ]

  const comparePlanCategory = (category: PlanCategory) => {
    // TODO: something to use the longest keys plan to compare against
    const renderMissingKeysCategory = (missingKeysArray: string[]) => (
      <details>
        <summary className='font-heading-5 text-red'>{capitaliseFirstLetter(category)} - {missingKeysArray.length} properties missing</summary>
        {missingKeysArray.map((categoryKey: string) => <p key={categoryKey}>{categoryKey}</p>)}
      </details>
    )


    const categoryAcrossPlansArray = plansArray.map(plan => plan[category])
    console.log('category', category, categoryAcrossPlansArray) // important debugger

    const firstPlanKeys = Object.keys(categoryAcrossPlansArray[0])


    const missingKeysArray = firstPlanKeys
      .filter(categoryKey => categoryAcrossPlansArray
        .every(category => {
          compare(category[categoryKey], categoryAcrossPlansArray[0][categoryKey])
        }))


    if (missingKeysArray.length > 0) {
      return renderMissingKeysCategory(missingKeysArray)
    }

    const categoryKeys = Object.keys(categoryAcrossPlansArray[0])

    const matchingCategoryKeyTotal = categoryKeys.reduce((acc, categoryKey) => { // TODO: Manually memoise this
      const allPlansHaveSameValue = plansArray.every((plan) => compare(plan[category][categoryKey], plansArray[0][category][categoryKey]))
      // eslint-disable-next-line no-param-reassign
      allPlansHaveSameValue && acc++
      return acc
    }, 0)

    const doesCategoryKeyMatch = (categoryKey: string) => plansArray.every((plan) => compare(plan[category][categoryKey], plansArray[0][category][categoryKey]))
    const categoryMatchingPercentage = (matchingCategoryKeyTotal / categoryKeys.length) * 100
    const isEmptyCategory = categoryKeys.length === 0


    const renderDetails = () => {
      return `${matchingCategoryKeyTotal}/${categoryKeys.length} matches`
    }
    return (
      <details className='bg-grey-200 m-[20px] border-4 border-grey-400 rounded-[10px] min-h-[50px] p-[10px]'>
        <summary className={`flex space-between cursor-pointer font-heading-5 ${categoryMatchingPercentage < 75 && 'text-red'}`}>


          <span>
            {capitaliseFirstLetter(category)}
          </span>
          <span>
            {isEmptyCategory ? 'Blank' : renderDetails()}
          </span>
        </summary>
        {categoryKeys.map(categoryKey => <p className={ doesCategoryKeyMatch(categoryKey) ? 'text-green' : 'text-red'} key={categoryKey}>{categoryKey}</p>)}
      </details>
    )
  }

  return (
    <div className='w-full p-[20px]'>
      <h1 className={'font-heading-3'}>Add summary bit</h1>
      {planCategories.map(category => comparePlanCategory(category))}
    </div>
  )
}

export default PlanComparator


// Stuff to do

// Set up states for each category to compare (is this always fixed?})
// 1. No category in any env
// 2. Missing category in one env
// 3. Blank in all env
// 4 only one env?
// 4. Categories with sub categories
// 5. Images, and content ordering


// 6. When not matching offer a button to launch modal to see value in each env
// 7. Write that modal to show all properties in each env
// 8. Make it look cool. Animate dropdown

// remove isPrimitive if not using
