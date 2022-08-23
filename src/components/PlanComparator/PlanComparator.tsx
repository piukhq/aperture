import React from 'react'

import {SelectedPlans} from 'types'
type Props = {
  plans: SelectedPlans
}

const PlanComparator = ({plans}: Props) => {
  const {dev, staging, prod} = plans

  console.log('dev', dev)
  console.log('staging', staging)
  console.log('prod', prod)


  return (
    <div className='w-full text-center mt-[10px]'>
      <h1 className='font-heading-2'>Plan comparator</h1>
      <p>Dev: {dev?.id || 'Nope'}</p>
      <p>Staging: {staging?.id || 'Nope'}</p>
      <p>Prod: {prod?.id || 'Nope'}</p>
    </div>
  )
}

export default PlanComparator

// Do comparator for account and balances
