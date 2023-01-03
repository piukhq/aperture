import React from 'react'
import {SelectedPlans} from 'types'
import compare from 'just-compare'
import PlanSummary from './components/PlanSummary'
import CategoryDetails from './components/CategoryDetails'
import ImageDetails from './components/ImageDetails'
import {PlanCategory} from 'utils/enums'

type Props = {
  plans: SelectedPlans
}

const PlanComparator = ({plans}: Props) => {
  // used for plan summary component
  let totalKeys = 0
  let totalMatches = 0

  const plansArray = Object.values(plans)
  const planCategories = [
    PlanCategory.ACCOUNT,
    PlanCategory.BALANCES,
    PlanCategory.CARD,
    PlanCategory.CONTENT,
    PlanCategory.FEATURE_SET,
    PlanCategory.IMAGES,
  ]

  const comparePlanCategory = (category: PlanCategory) => {
    let categoryAcrossEnvsArray = plansArray.map(plan => plan[category])

    if (category === PlanCategory.CONTENT) { // Mutate the array to sort the content by column name so we can compare fairly
      type PlanContent = {
        column: string,
        content: string
      }
      categoryAcrossEnvsArray = categoryAcrossEnvsArray.map((envCategory:PlanContent[]) => {
        return envCategory.slice().sort((a:PlanContent, b:PlanContent) => a.column.localeCompare(b.column))
      })
    }

    // The environment with the most keys for this category is the one we compare other plans against, not perfect but most likely to be the most complete
    const categoryWithMostKeysAcrossEnvs = [...categoryAcrossEnvsArray].sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0]
    const indexOfCategoryWithMostKeysAcrossEnvs = categoryAcrossEnvsArray.findIndex((envCategory) => envCategory === categoryWithMostKeysAcrossEnvs)
    const mostKeysCategory = Object.keys(categoryAcrossEnvsArray[indexOfCategoryWithMostKeysAcrossEnvs])

    // There is a special case for images since it requires a visual comparison anyhow, Plan Comparator just does a high-level comparison
    if (category === PlanCategory.IMAGES) {
      return <ImageDetails key={category} categoryAcrossEnvsArray={categoryAcrossEnvsArray}/>
    }

    // check the category key against known edge cases
    const validateCategoryValueAcrossEnvs = (categoryValueAcrossEnvs, categoryKey: string) => {
      if (categoryKey === 'plan_documents') { // Set the URL to be the same as its different across environments by design
        type PlanDocument = {
          url: string,
          name: string,
          description: string,
          display: string[],
          checkbox: boolean,
        }
        const sortedCategoryValueAcrossEnvsArray = categoryValueAcrossEnvs.map((planDocumentsPerEnv: PlanDocument[]) => {
          return planDocumentsPerEnv.map((planDocument:PlanDocument) => ({
            ...planDocument,
            url: 'https://www.homogenisedURL.com',
          })).sort((a, b) => a.name.localeCompare(b.name))
        })

        // eslint-disable-next-line no-param-reassign
        categoryValueAcrossEnvs = sortedCategoryValueAcrossEnvsArray
      }
      return categoryValueAcrossEnvs
    }

    const isValueMatchedAcrossEnvs = (categoryKey: string) => {
      const categoryValueAcrossEnvs = categoryAcrossEnvsArray.map((envCategory) => envCategory[categoryKey])
      const validCategoryValueAcrossEnvs = validateCategoryValueAcrossEnvs(categoryValueAcrossEnvs, categoryKey)
      return validCategoryValueAcrossEnvs.every((envCategoryData) => compare(envCategoryData, validCategoryValueAcrossEnvs[0]))
    }

    // Check for how many keys for a category match across environments
    const totalMatchingCategoryValues = mostKeysCategory.reduce((acc, categoryKey) => { // TODO: Manually memoise this
      // eslint-disable-next-line no-param-reassign
      isValueMatchedAcrossEnvs(categoryKey) && acc++
      return acc
    }, 0)

    totalKeys += mostKeysCategory.length
    totalMatches += totalMatchingCategoryValues

    // Renders content displayed initially for a category

    return (
      <CategoryDetails
        key={category}
        hasNoCategoryValues={mostKeysCategory.length === 0}
        hasAllCategoryValuesMatching={totalMatchingCategoryValues === mostKeysCategory.length}
        category={category}
        mostKeysCategory={mostKeysCategory}
        categoryAcrossEnvsArray={categoryAcrossEnvsArray}
        isValueMatchedAcrossEnvsFn={isValueMatchedAcrossEnvs}
        categoryWithMostKeysAcrossEnvs={categoryWithMostKeysAcrossEnvs}
        plans={plans}
        totalMatchingCategoryValues={totalMatchingCategoryValues}
      />
    )
  }

  //If there is only one environment a plan exists in, there is nothing to compare with
  if (plansArray.length === 1) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <p className='font-heading-7'>{plansArray[0].account.plan_name} only exists in {Object.keys(plans).filter(environment => plans[environment]?.id)[0]} so there is nothing to compare with.</p>
      </div>
    )
  }

  // TODO: Flow reversed to provide plan summary the calculated values from the categories without unnecessary re-renders. Is there a better way?
  return (
    <div className='w-full h-full p-[20px] flex flex-col-reverse items-center'>
      <section>
        {planCategories.map(category => comparePlanCategory(category))}
      </section>
      <PlanSummary plans={plans} plansArray={plansArray} totalKeys={totalKeys} totalMatches={totalMatches}/>
    </div>
  )
}

export default PlanComparator

// Stuff to do
// 4. Merge to modern path!
// 5. Unit Testing
// 5.5 Typesafety
// 6. performace, too many spans, etc


// Bugs
// P2 - The details dont close when you change plans
