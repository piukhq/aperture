import React from 'react'
import {SelectedPlans} from 'types'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import compare from 'just-compare'
import {ImageTypes} from 'utils/enums'
import PlanSummary from './components/PlanSummary'

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

  // used for plan summary component
  let totalKeys = 0
  let totalMatches = 0

  const {dev, staging, prod} = plans

  const plansArray = [] // TODO: Temp check for multiple plans
  dev && plansArray.push(dev)
  staging && plansArray.push(staging)
  prod && plansArray.push(prod)
  const validEnvironmentsArray = Object.keys(plans).filter(environment => plans[environment]?.id)

  const planCategories = [
    PlanCategory.ACCOUNT,
    PlanCategory.BALANCES,
    PlanCategory.CARD,
    PlanCategory.CONTENT,
    PlanCategory.FEATURE_SET,
    PlanCategory.IMAGES,
  ]

  const comparePlanCategory = (category: PlanCategory) => {
    const categoryAcrossEachEnvArray = plansArray.map(plan => plan[category])
    console.log('category', category, categoryAcrossEachEnvArray) // important debugger

    // The environment with the most keys for this category is the one we compare other plans against, not perfect but most likely to be the most complete
    const categoryWithMostKeysAcrossEnvs = categoryAcrossEachEnvArray.sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0]
    // Get keys for this category
    const categoryKeys = Object.keys(categoryWithMostKeysAcrossEnvs)

    // Check for missing keys in other environments
    const missingKeysArray = Object.keys(categoryWithMostKeysAcrossEnvs)
      .filter(categoryKey => categoryAcrossEachEnvArray
        .every(category => {
          compare(category[categoryKey], categoryWithMostKeysAcrossEnvs[categoryKey])
        }))

    if (missingKeysArray.length > 0) { // For debugging
      console.log('missing Keys!')
    }


    // TODO: Images is a special case...
    if (category === PlanCategory.IMAGES) {
      const validImageValuesArray = categoryAcrossEachEnvArray.map(envCategory => {
        return envCategory.map(image => {

          const trimmedImage = Array.from(image.url.split('/')).pop()

          return {
            cta_url: image.cta_url,
            description: image.description,
            encoding: image.encoding,
            type: ImageTypes[image.type],
            url: trimmedImage,
          }
        })
      }).sort((a, b) => a.type > b.type ? 1 : -1)


      // get count of each type of image found in ImageTypes

      //not this below


      const imageTypeCounts = validImageValuesArray.map(envCategory => {
        return envCategory.map(image => {
          return image.type
        }).reduce((acc, curr) => {
          if (acc[curr]) {
            acc[curr]++
          } else {
            acc[curr] = 1
          }
          return acc
        }, {})
      }).sort((a, b) => a.type > b.type ? 1 : -1)
      console.log(imageTypeCounts)


      const isImageTypeCountsEqual = imageTypeCounts.every((imageTypeCount, index) => {
        if (index === 0) {
          return true
        }
        return compare(imageTypeCount, imageTypeCounts[index - 1])
      })

      return isImageTypeCountsEqual ? 'equal' : 'not equal'
    }

    const isKeyMatchedAcrossEnvs = (categoryKey: string) => plansArray.every((plan) => compare(plan[category][categoryKey], plansArray[0][category][categoryKey]))

    // Check for how many keys for a category match across environments
    const totalMatchingCategoryKeys = categoryKeys.reduce((acc, categoryKey) => { // TODO: Manually memoise this
      // eslint-disable-next-line no-param-reassign
      isKeyMatchedAcrossEnvs(categoryKey) && acc++
      return acc
    }, 0)

    totalKeys += categoryKeys.length
    totalMatches += totalMatchingCategoryKeys

    const allKeysMatch = totalMatchingCategoryKeys === categoryKeys.length
    const noKeys = categoryKeys.length === 0

    // Renders content displayed initially for a category
    const renderCategorySummary = () => {
      const renderCategorySummaryInformation = () => {
        if (noKeys) {
          return 'unused'
        } else if (allKeysMatch) {
          return 'fully matched'
        } else {
          return `${totalMatchingCategoryKeys} matches out of ${categoryKeys.length}`
        }
      }

      return (
        <summary className='w-full cursor-pointer font-heading-5'>
          {capitaliseFirstLetter(category)}{' '}<span className='italic font-body-3 ml-1'>({renderCategorySummaryInformation()})</span>
        </summary>
      )
    }

    // Renders content displayed when a category is expanded
    const renderCategoryDetails = () => {
      const renderHeader = () => {
        if (noKeys) {
          return <p className='font-body-3 italic my-5'> No environments use this category</p>
        }
        if (allKeysMatch) {
          return <p className='font-body-3 italic my-5'> {capitaliseFirstLetter(category)} has {categoryKeys.length} identical properties across all logged-in environments</p>
        } else {
          return <p className='font-heading-7 my-5'>Mismatched Keys</p>
        }
      }
      const renderMismatchedCategoryKey = (categoryKey: string) => { // Displays the key when not identical across all environments
        return (
          <details key={categoryKey} className='m-5 bg-red/20 rounded-[10px] p-[10px]'>
            <summary className='font-heading-7 cursor-pointer' key={categoryKey}>
              {categoryKey}
            </summary>
            {
              // render the value for each environment
              plansArray.map((plan, index) => {
                const env = capitaliseFirstLetter(Object.keys(plans)[index])
                const value = plan[category][categoryKey] || '<missing value>'
                const valueString = typeof value === 'object' ? JSON.stringify(value) : value
                return (
                  <div key={index} className='flex flex-col p-4 gap-2 bg-black/10 m-4 rounded-[10px]'>
                    <p className='font-heading-8 font-bold'>{env}</p>
                    <p className='font-body-3'>{valueString}</p>
                  </div>
                )
              })
            }
          </details>
        )
      }

      return (
        <>
          {renderHeader()}
          {!allKeysMatch && categoryKeys.map(categoryKey => !isKeyMatchedAcrossEnvs(categoryKey) && renderMismatchedCategoryKey(categoryKey))}
        </>
      )
    }

    return (
      <details key={category} className={`mt-[30px] rounded-[10px] p-[20px] w-[400px] open:w-[700px] hover:shadow-md open:shadow-md duration-300 ease-out open:animate-slideDown origin-top 
        ${noKeys ? 'bg-grey-200 dark:bg-grey-800' : allKeysMatch ? 'bg-green/20' : 'bg-red/20'}`}>
        {renderCategorySummary()}
        {renderCategoryDetails()}
      </details>
    )
  }

  if (plansArray.length === 1) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <p className='font-heading-7'>{plansArray[0].account.plan_name} only exists in {validEnvironmentsArray[0]} so there is nothing to compare with.</p>
      </div>
    )
  }

  return (
    <div className='w-full h-full p-[20px] flex flex-col items-center'>
      <PlanSummary plans={plans} plansArray={plansArray} totalKeys={totalKeys} totalMatches={totalMatches}/>
      {planCategories.map(category => comparePlanCategory(category))}
    </div>
  )
}

export default PlanComparator

// Stuff to do
// 2.content ordering
// 4. Write that part to show all properties in each env
// 3. When not matching offer a button to launch modal to see value in each env


// 6. remove isPrimitive if not using

