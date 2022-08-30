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
    PlanCategory.BALANCES,
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
    const totalKeysInCategory = categoryKeys.length
    const isEmptyCategory = totalKeysInCategory === 0
    const isFullyMatchedCategory = matchingCategoryKeyTotal === totalKeysInCategory


    const renderCategorySummaryInformation = () => {
      if (isEmptyCategory) {
        return 'unused'
      } else if (isFullyMatchedCategory) {
        return 'fully matched'
      } else {
        return `${matchingCategoryKeyTotal} matches out of ${categoryKeys.length}`
      }
    }


    const renderCategoryDetails = () => {
      const renderMismatchedCategoryKey = (categoryKey: string) => {
        return (
          <details className='m-5 bg-red/20 rounded-[10px] p-[10px]'>
            <summary className='font-heading-8' key={categoryKey}>
              {categoryKey}
            </summary>
          </details>
        )
      }


      const renderCategoryHeader = () => {
        if (isEmptyCategory) {
          return <p className='font-body-3 italic my-5'> No environments use this category</p>
        }
        if (isFullyMatchedCategory) {
          return <p className='font-body-3 italic my-5'> {capitaliseFirstLetter(category)} has {totalKeysInCategory} identical properties across all logged-in environments</p>
        } else {
          return <p className='font-heading-7 my-5'>Mismatched Keys</p>
        }
      }


      return (
        <>
          {renderCategoryHeader()}
          {!isFullyMatchedCategory && categoryKeys.map(categoryKey => !doesCategoryKeyMatch(categoryKey) && renderMismatchedCategoryKey(categoryKey))}
        </>
      )
    }


    return (
      <details className={`m-[20px] rounded-[10px] min-h-[50px] p-[20px] shadow-md
        ${isEmptyCategory ? 'bg-grey-200' : isFullyMatchedCategory ? 'bg-green/10' : 'bg-red/10'}`}>
        <summary className='w-full cursor-pointer font-heading-5'>
          {capitaliseFirstLetter(category)}{' '}<span className='italic font-body-3 ml-1'>({renderCategorySummaryInformation()})</span>
        </summary>
        {renderCategoryDetails()}
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
// 5. Images, and content ordering


// 6. When not matching offer a button to launch modal to see value in each env
// 7. Write that modal to show all properties in each env
// 8. Make it look cool. Animate dropdown

// remove isPrimitive if not using
