import {useEffect, useState} from 'react'
import {capitaliseFirstLetter} from 'utils/stringFormat'
import {SelectedPlans} from 'types'
import {PlanCategory} from 'utils/enums'

type Props = {
  hasNoCategoryValues: boolean
  hasAllCategoryValuesMatching: boolean
  category: string
  categoryAcrossEnvsArray: any[]
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
  const renderHeader = () => {
    if (hasNoCategoryValues) {
      return <p className='font-body-3 italic my-5'>No environments use this category</p>
    }
    if (hasAllCategoryValuesMatching) {
      return <p className='font-body-3 italic my-5'>{capitaliseFirstLetter(category)} has {mostKeysCategory.length} matching propert{mostKeysCategory.length === 1 ? 'y' : 'ies'} across all logged-in environments</p>
    } else {
      return <p className='font-heading-7 my-5'>Mismatched Keys:</p>
    }
  }
  const renderMismatchedCategoryValue = (categoryKey: string) => { // Displays the key when not identical across all environments
    const renderCategoryValue = (categoryValue: string) => {
      const renderCharacterComparison = (str: string, arrayIndex = null) => {
        return Array.from(str).map((char, index) => {
          if (
            categoryAcrossEnvsArray.every((envCategory) => JSON.stringify(envCategory[categoryKey][arrayIndex] || '')[index] === char) ||
            categoryAcrossEnvsArray.every((envCategory) => JSON.stringify(envCategory[categoryKey] || '')[index] === char)
          ) {
            return char
          } else {
            return <span className='underline decoration-wavy decoration-red' key={index}>{char}</span>
          }
        })
      }

      if (Array.isArray(categoryValue)) {
        categoryKey === 'add_fields' && console.log('categoryValue', JSON.stringify(categoryValue[0]))
        return Array.from(categoryValue).map((element, index) => (
          <p className='mb-2' key={index}>{renderCharacterComparison(JSON.stringify(element), index) }</p>
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
      categoryKey === 'plan_documents' && (categoryNote = 'ignoring environment specific URLs')
      if (categoryNote) {
        return `(${categoryNote})`
      }
      return null
    }

    const isArray = Array.isArray(categoryWithMostKeysAcrossEnvs[categoryKey])

    return (
      <details key={categoryKey} className={'m-5 bg-red/20 rounded-[10px] p-[10px]'}>
        <summary className='font-heading-7 cursor-pointer' key={categoryKey}>
          {category === PlanCategory.CONTENT ? categoryWithMostKeysAcrossEnvs[categoryKey].column : categoryKey} {renderCategoryKeyNotes(categoryKey)}
        </summary>
        {categoryAcrossEnvsArray.map((category, index) => (
          <div key={index} className='flex flex-col p-4 gap-2 bg-black/10 m-4 rounded-[10px]'>
            <p className='font-heading-8 font-bold'>{capitaliseFirstLetter(Object.keys(plans)[index])}</p>
            <p className='font-body-3'>{isArray ? renderCategoryValue(category[categoryKey]) : renderCategoryValue(JSON.stringify(category[categoryKey]) || '')}</p>
          </div>
        ))
        }
      </details>
    )
  }

  return (
    <details key={category} className={`mt-[30px] rounded-[10px] p-[20px] w-[700px] hover:shadow-md open:shadow-md ${isMounted ? 'opacity-100' : 'opacity-0'} 
    duration-1000 ease-out origin-top ${hasNoCategoryValues ? 'bg-grey-200 dark:bg-grey-800' : hasAllCategoryValuesMatching ? 'bg-green/20' : 'bg-red/20'}`}>
      <summary className='w-full cursor-pointer font-heading-5'>
        {capitaliseFirstLetter(category)}{' '}<span className='italic font-body-3 ml-1'>({renderCategorySummaryInformation()})</span>
      </summary>
      {renderHeader()}
      {!hasAllCategoryValuesMatching && mostKeysCategory.map(categoryKey => !isValueMatchedAcrossEnvsFn(categoryKey) && renderMismatchedCategoryValue(categoryKey))}
    </details>
  )
}

export default CategoryDetails
