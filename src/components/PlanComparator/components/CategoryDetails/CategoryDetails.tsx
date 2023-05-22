import {useEffect, useState} from 'react'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import {SelectedPlans} from 'types'
import {PlanCategory} from 'utils/enums'
import {useIsMobileViewportDimensions} from 'utils/windowDimensions'

type Props = {
  hasNoCategoryValues: boolean
  hasAllCategoryValuesMatching: boolean
  category: string
  categoryAcrossEnvsArray: []
  mostKeysCategory: string[]
  categoryWithMostKeysAcrossEnvs: string
  plans: SelectedPlans
  isValueMatchedAcrossEnvsFn: (categoryKey: string) => boolean
  totalMatchingCategoryValues: number
}

const CategoryDetails = ({
  hasNoCategoryValues,
  hasAllCategoryValuesMatching,
  category,
  mostKeysCategory,
  categoryAcrossEnvsArray,
  categoryWithMostKeysAcrossEnvs,
  plans,
  isValueMatchedAcrossEnvsFn,
  totalMatchingCategoryValues,
}: Props) => {

  const isMobileViewport = useIsMobileViewportDimensions()
  // Fade in the component
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setTimeout(() => setIsMounted(true), (200))
  }, [])

  const renderCategorySummaryInformation = () => {
    if (hasNoCategoryValues) {
      return 'unused'
    } else if (hasAllCategoryValuesMatching) {
      return 'fully matched'
    } else {
      return `${totalMatchingCategoryValues} matches out of ${mostKeysCategory.length}`
    }
  }

  const renderDetailsHeader = () => {
    if (hasNoCategoryValues) {
      return <p className='font-body-3 italic my-5'>No environments use this category</p>
    }
    if (hasAllCategoryValuesMatching) {
      return <p className='font-body-3 italic my-5'>{capitaliseFirstLetter(category)} has {mostKeysCategory.length} matching propert{mostKeysCategory.length === 1 ? 'y' : 'ies'} across all logged-in environments</p>
    } else {
      return <p className='font-heading-7 my-5 text-grey-800 dark:text-grey-100'>Mismatched Values:</p>
    }
  }

  const renderMismatchedCategoryValue = (categoryKey: string) => { // Displays the key when not identical across all environments
    const renderCategoryValue = (categoryValue: string) => {
      const renderCharacterComparison = (str: string) => {
        return Array.from(str).map((char, index) => {
          if (categoryAcrossEnvsArray.every((envCategory) => JSON.stringify(envCategory[categoryKey] || '')[index] === char)
          ) {
            return char
          } else {
            return <span className='bg-red/50' key={index}>{char}</span>
          }
        })
      }

      if (!categoryAcrossEnvsArray.every((envCategory) => envCategory[categoryKey])) {
        return <span className='mb-2'>{categoryValue || <em>Not found in this environment</em>}</span>
      }

      return renderCharacterComparison(categoryValue)
    }

    const renderCategoryArray = (categoryArray: Array<Record<string, unknown>>) => {
        enum CategoryArraySortKey {
        'plan_documents' = 'name',
        'add_fields' = 'column',
        'authorise_fields' = 'column',
        'registration_fields' = 'column',
        'enrol_fields' = 'column',
      }

        const getSortedArray = unsortedArray => Array.from(unsortedArray).sort((a, b) => a[CategoryArraySortKey[categoryKey]] > b[CategoryArraySortKey[categoryKey]] ? 1 : -1)

        const renderCharacterComparison = (str: string, arrayIndex) => {
          return Array.from(str).map((char, index) => {
            if (categoryAcrossEnvsArray
              .every((envCategory) => JSON.stringify(getSortedArray(envCategory[categoryKey])[arrayIndex] || '')[index] === char)) {
              return char
            } else {
              return <span className='bg-red/50' key={index}>{char}</span>
            }
          })
        }

        return getSortedArray(categoryArray).map((element, index) => (
          <p className='mb-2' key={index}>{renderCharacterComparison(JSON.stringify(element), index) }</p>
        ))
    }

    const renderCategoryKeyNotes = (categoryKey: string) => {
      let categoryNote = null
      categoryKey === 'plan_documents' && (categoryNote = 'url is ignored for comparison')
      if (categoryNote) {
        return `(${categoryNote})`
      }
      return null
    }

    const isArray = Array.isArray(categoryWithMostKeysAcrossEnvs[categoryKey])

    return (
      <details key={categoryKey} className={'m-5 bg-red/20 hover:bg-red/25 hover:open:bg-red/20 duration-300 rounded-[10px] p-[10px]'}>
        <summary className='font-heading-7 cursor-pointer' key={categoryKey}>
          {category === PlanCategory.CONTENT ? categoryWithMostKeysAcrossEnvs[categoryKey].column : categoryKey} {renderCategoryKeyNotes(categoryKey)}
        </summary>
        {categoryAcrossEnvsArray.map((category, index) => (
          <div key={index} className='flex flex-col p-4 gap-2 bg-black/10 m-4 rounded-[10px]'>
            <p className='font-heading-8 font-bold'>{capitaliseFirstLetter(Object.keys(plans)[index])}</p>
            <p className='font-body-3 break-words w-full font-body-4'>{isArray ? renderCategoryArray(category[categoryKey]) : renderCategoryValue(JSON.stringify(category[categoryKey]) || '')}</p>
          </div>
        ))
        }
      </details>
    )
  }

  return (
    <details key={category} className={`mt-[30px] rounded-[10px] p-[20px] shadow-sm hover:shadow-md open:shadow-md ${isMobileViewport ? 'w-[550px]' : 'w-[750px]'} ${isMounted ? 'opacity-100' : 'opacity-0'} 
    duration-300 ease-in-out origin-top ${hasNoCategoryValues ? 'bg-grey-200 dark:bg-grey-800 hover:bg-grey-200/75 hover:dark:bg-grey-800/75' : hasAllCategoryValuesMatching ? 'bg-green/20 hover:bg-green/25' : 'bg-red/20 hover:bg-red/25 hover:open:bg-red/20'}`}>
      <summary className='w-full cursor-pointer font-heading-5 text-grey-800 dark:text-grey-100'>
        {capitaliseFirstLetter(category)}{' '}<span className='italic font-body-3 ml-1 text-grey-800 dark:text-grey-100'>({renderCategorySummaryInformation()})</span>
      </summary>
      {renderDetailsHeader()}
      {!hasAllCategoryValuesMatching && mostKeysCategory.map(categoryKey => !isValueMatchedAcrossEnvsFn(categoryKey) && renderMismatchedCategoryValue(categoryKey))}
    </details>
  )
}

export default CategoryDetails
