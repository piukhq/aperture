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
    let categoryAcrossEnvsArray = plansArray.map(plan => plan[category])
    // console.log('category', category, categoryAcrossEnvsArray) // important debugger

    if (category === PlanCategory.CONTENT) { // Mutate the array to sort the content by column name so we can compare them fairly
      type PlanContent = {
        column: string,
        content: string
      }
      categoryAcrossEnvsArray = categoryAcrossEnvsArray.map((envCategory:PlanContent[]) => {
        return envCategory.slice().sort((a:PlanContent, b:PlanContent) => a.column.localeCompare(b.column))
      })
    }

    // The environment with the most keys for this category is the one we compare other plans against, not perfect but most likely to be the most complete
    const categoryWithMostKeysAcrossEnvs = categoryAcrossEnvsArray.sort((a, b) => Object.keys(b).length - Object.keys(a).length)[0]
    const indexOfCategoryWithMostKeysAcrossEnvs = categoryAcrossEnvsArray.findIndex((envCategory) => envCategory === categoryWithMostKeysAcrossEnvs)
    const mostKeysCategory = Object.keys(categoryAcrossEnvsArray[indexOfCategoryWithMostKeysAcrossEnvs])

    // TODO: Images is a special case since we need human eyes to check if they are visually correct, this just checks if the number of images for each image type match across environments
    if (category === PlanCategory.IMAGES) {
      const getImageTypesCount = () => {
        const validImageValuesArray = categoryAcrossEnvsArray.map(envCategory => {
          return envCategory.map(image => {
            return {
              cta_url: image.cta_url,
              description: image.description,
              encoding: image.encoding,
              type: ImageTypes[image.type],
            }
          })
        }).sort((a, b) => a.type > b.type ? 1 : -1)

        // get count of each type of image found in ImageTypes

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

        const isImageTypeCountsEqual = imageTypeCounts.every((imageTypeCount, index) => {
          if (index === 0) {
            return true
          }
          return compare(imageTypeCount, imageTypeCounts[index - 1])
        })
        return isImageTypeCountsEqual
      }


      const hasSameNumberOfImages = categoryAcrossEnvsArray.every(envCategory => envCategory.length === categoryAcrossEnvsArray[0].length)
      const hasSameNumberOfImageTypes = hasSameNumberOfImages && getImageTypesCount()
      const imageReport: string = hasSameNumberOfImages && hasSameNumberOfImageTypes ?
        'The number of images per type match across environments. Confirm they are visually correct via Asset Comparator.' : !hasSameNumberOfImages ?
          'The total number of images do not match across environments' : 'The number of images per type do not match across environments'

      return (
        <section key={category} className={`mt-[30px] rounded-[10px] p-[20px] w-[400px] ${!hasSameNumberOfImageTypes ? 'bg-red/20' : 'bg-green/20'}`}>
          <div className='w-full font-heading-5'>{capitaliseFirstLetter(category)}
            <p className='italic font-body-3'>
              {imageReport}</p>
          </div>
        </section>
      )
    }

    // check the category key against known edge cases
    const validateCategoryKeyDataAcrossEnvs = (categoryKeyDataAcrossEnvs, categoryKey: string) => {
      if (categoryKey === 'plan_documents') { // Set the URL to be the same as its different across environments by design
        type PlanDocument = {
          url: string,
          name: string,
          description: string,
          display: string[],
          checkbox: boolean,
        }
        return categoryKeyDataAcrossEnvs.map((planDocumentsPerEnv: PlanDocument[]) => {
          return planDocumentsPerEnv.map((planDocument:PlanDocument) => ({
            ...planDocument,
            url: 'https://www.homogenisedURL.com',
          })).sort((a, b) => a.name.localeCompare(b.name))
        })
      }
      return categoryKeyDataAcrossEnvs
    }

    const isKeyMatchedAcrossEnvs = (categoryKey: string) => {
      const categoryKeyDataAcrossEnvs = categoryAcrossEnvsArray.map((envCategory) => envCategory[categoryKey])
      const validCategoryKeyDataAcrossEnvs = validateCategoryKeyDataAcrossEnvs(categoryKeyDataAcrossEnvs, categoryKey)
      return validCategoryKeyDataAcrossEnvs.every((envCategoryData) => compare(envCategoryData, validCategoryKeyDataAcrossEnvs[0]))
    }

    // Check for how many keys for a category match across environments
    const totalMatchingCategoryKeys = mostKeysCategory.reduce((acc, categoryKey) => { // TODO: Manually memoise this
      // eslint-disable-next-line no-param-reassign
      isKeyMatchedAcrossEnvs(categoryKey) && acc++
      return acc
    }, 0)

    totalKeys += mostKeysCategory.length
    totalMatches += totalMatchingCategoryKeys
    const allKeysMatch = totalMatchingCategoryKeys === mostKeysCategory.length
    const noKeys = mostKeysCategory.length === 0

    // Renders content displayed initially for a category
    const renderCategorySummary = () => {
      const renderCategorySummaryInformation = () => {
        if (noKeys) {
          return 'unused'
        } else if (allKeysMatch) {
          return 'fully matched'
        } else {
          return `${totalMatchingCategoryKeys} matches out of ${mostKeysCategory.length}`
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
          return <p className='font-body-3 italic my-5'>No environments use this category</p>
        }
        if (allKeysMatch) {
          return <p className='font-body-3 italic my-5'>{capitaliseFirstLetter(category)} has {mostKeysCategory.length} matching propert{mostKeysCategory.length === 1 ? 'y' : 'ies'} across all logged-in environments</p>
        } else {
          return <p className='font-heading-7 my-5'>Mismatched Keys:</p>
        }
      }
      const renderMismatchedCategoryKey = (categoryKey: string) => { // Displays the key when not identical across all environments

        const renderCategoryValue = (categoryValue: string) => {
          const renderCharacterComparison = (str: string) => {
            return Array.from(str).map((char, index) => {
              if (categoryAcrossEnvsArray.every((envCategory) => JSON.stringify(envCategory[categoryKey] || '')[index] === char)) {
                return char
              } else {
                return <span className='bg-orange/40' key={index}>{char}</span>
              }
            })
          }
          if (Array.isArray(categoryValue)) {
            return Array.from(categoryValue).map((element, index) => (
              <p className='mb-2' key={index}>{renderCharacterComparison(element) }</p>
            ))
          }

          if (!categoryAcrossEnvsArray.every((envCategory) => envCategory[categoryKey])) {
            return <p className='mb-2'>{categoryValue || <em>Not found in this environment</em>}</p>
          }

          const validatedStringArrayAcrossEnvs = renderCharacterComparison(categoryValue)
          return validatedStringArrayAcrossEnvs
        }

        const renderCategoryKeyNotes = (categoryKey: string) => {
          let categoryNote = null
          categoryKey === 'plan_documents' && (categoryNote = 'URL ignored for comparison')
          if (categoryNote) {
            return `(${categoryNote})`
          }
          return null
        }


        return (
          <details key={categoryKey} className='m-5 bg-red/20 rounded-[10px] p-[10px]'>
            <summary className='font-heading-7 cursor-pointer' key={categoryKey}>
              {category === PlanCategory.CONTENT ? categoryWithMostKeysAcrossEnvs[categoryKey].column : categoryKey} {renderCategoryKeyNotes(categoryKey)}
            </summary>
            {
              // render the value for each environment
              categoryAcrossEnvsArray.map((category, index) => (
                <div key={index} className='flex flex-col p-4 gap-2 bg-black/10 m-4 rounded-[10px]'>
                  <p className='font-heading-8 font-bold'>{capitaliseFirstLetter(Object.keys(plans)[index])}</p>
                  <p className='font-body-3'>{renderCategoryValue(JSON.stringify(category[categoryKey]) || '')}</p>
                </div>
              ))
            }
          </details>
        )
      }

      return (
        <>
          {renderHeader()}
          {!allKeysMatch && mostKeysCategory.map(categoryKey => !isKeyMatchedAcrossEnvs(categoryKey) && renderMismatchedCategoryKey(categoryKey))}
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

  //If there is only one plan, there is nothing to compare with
  if (plansArray.length === 1) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <p className='font-heading-7'>{plansArray[0].account.plan_name} only exists in {validEnvironmentsArray[0]} so there is nothing to compare with.</p>
      </div>
    )
  }

  // Flow reversed to provide plan summary the calculated values from the categories without unnecessary re-renders
  return (
    <div className='w-full h-full p-[20px] flex flex-col-reverse items-center'>
      <div>
        {planCategories.map(category => comparePlanCategory(category))}
        {comparePlanCategory(PlanCategory.CONTENT)}
      </div>
      <PlanSummary plans={plans} plansArray={plansArray} totalKeys={totalKeys} totalMatches={totalMatches}/>
    </div>
  )
}

export default PlanComparator

// Stuff to do
// 3.5 Refactor into easier chunks?
// 4. Merge to modern path!
// 5. Unit Testing
// POLISH!


// Bugs:

// 1. When there is a mismatched key, the environment is not entirely correct.. related to MostKeys categoy?
// 2. Wasabi content is wierd
