import {useEffect} from 'react'
import {useVerification} from './useVerification'
import {useGetDevPlansMutation, useGetStagingPlansMutation, useGetProdPlansMutation} from 'services/plans'
import {
  getDevVerificationToken,
  getStagingVerificationToken,
  getProdVerificationToken,
} from 'utils/storage'

export const useGetPlans = () => {
  const {devToken, stagingToken, prodToken} = useVerification()

  const [getDevPlans, {data: devPlans, reset: resetDevPlans, isLoading: devIsLoading}] = useGetDevPlansMutation({fixedCacheKey: 'devPlans'})
  const [getStagingPlans, {data: stagingPlans, reset: resetStagingPlans, isLoading: stagingIsLoading}] = useGetStagingPlansMutation({fixedCacheKey: 'stagingPlans'})
  const [getProdPlans, {data: prodPlans, reset: resetProdPlans, isLoading: prodIsLoading}] = useGetProdPlansMutation({fixedCacheKey: 'prodPlans'})

  useEffect(() => {
    if (!devIsLoading && !devPlans && (getDevVerificationToken() || devToken)) {
      getDevPlans()
    }
  }, [devIsLoading, devPlans, devToken, getDevPlans])

  useEffect(() => {
    if (!stagingIsLoading && !stagingPlans && (getStagingVerificationToken() || stagingToken)) {
      getStagingPlans()
    }
  }, [stagingIsLoading, stagingPlans, stagingToken, getStagingPlans])

  useEffect(() => {
    if (!prodIsLoading && !prodPlans && (getProdVerificationToken() || prodToken)) {
      getProdPlans()
    }
  }, [prodIsLoading, prodPlans, prodToken, getProdPlans])

  return {
    resetDevPlans,
    resetStagingPlans,
    resetProdPlans,
    devIsLoading,
    stagingIsLoading,
    prodIsLoading,
  }
}
