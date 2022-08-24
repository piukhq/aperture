import React from 'react'

import {SelectedPlans} from 'types'
import {capitaliseFirstLetter} from 'utils/stringFormat'

type Props = {
  plans: SelectedPlans
}

enum PlanCategory {
  ACCOUNT = 'account',
  CARD = 'card',
  FEATURE_SET = 'feature_set',
}

const PlanComparator = ({plans}: Props) => {
  const {dev, staging, prod} = plans

  const plansArray = [dev, staging, prod]
  const planCategories = [PlanCategory.ACCOUNT, PlanCategory.CARD, PlanCategory.FEATURE_SET]


  const comparePlanCategory = (category: PlanCategory) => {
    const renderMissingKeysCategory = (missingKeysArray: string[]) => (
      <details>
        <summary className='font-heading-5 text-red'>{capitaliseFirstLetter(category)} - {missingKeysArray.length} properties missing</summary>
        {missingKeysArray.map((categoryKey: string) => <p key={categoryKey}>{categoryKey}</p>)}
      </details>
    )

    const renderCategorySummaryItem = (categoryKey: string) => {

      // compare all plansArray for the categoryKey to see if they all havcte the same value
      const allPlansHaveSameValue = plansArray.every((plan) => plan[category][categoryKey] === plansArray[0][category][categoryKey])
      return <p className={ allPlansHaveSameValue ? 'text-green' : 'text-red'} key={categoryKey}>{categoryKey}</p>
    }


    const categoryArray = plansArray.map(plan => plan[category])

    const missingKeysArray = Object.keys(categoryArray[0]).filter(key => !categoryArray.every(category => category[key]))

    if (missingKeysArray.length > 0) {
      return renderMissingKeysCategory(missingKeysArray)
    }

    const categoryKeys = Object.keys(categoryArray[0])


    return (
      <details>
        <summary className='font-heading-5 text-orange'>{capitaliseFirstLetter(category)} - {categoryArray.length} properties found but maybe dont match</summary>
        {categoryKeys.map(categoryKey => renderCategorySummaryItem(categoryKey))}
      </details>
    )
  }

  console.log(plansArray[2].card)


  return (
    <div className='w-full p-[20px]'>
      {planCategories.map(category => comparePlanCategory(category))}
    </div>
  )
}

export default PlanComparator


// Stuff to do.

// Add other categories to compare
// Set up states for each category to compare (is this always fixed?})
// 1. No category in any env
// 2. Missing category in one env
// 3. Blank in all env

// 4. categories with sub categories
// 5. images

// 6. When not matching offer a button to launch modal to see value in each env
// 7. Write that modal to show all properties in each env
// 8. Make it look cool.
