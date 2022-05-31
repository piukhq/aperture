import {useGetPlansQuery, usePostPlanMutation, useUpdatePlanMutation} from 'services/midManagementPlans'

export const useMidManagementPlans = () => {
  const {data: getPlansResponse, isLoading: getPlansIsLoading, error: getPlansError} = useGetPlansQuery()
  const [postPlan, {data: postPlanResponse, isLoading: postPlanIsLoading, error: postPlanError, reset: resetPostPlanResponse}] = usePostPlanMutation({fixedCacheKey: 'postPlan'})
  const [updatePlan, {data: updatePlanResponse, isLoading: updatePlanIsLoading, error: updatePlanError, reset: resetUpdatePlanResponse}] = useUpdatePlanMutation({fixedCacheKey: 'updatePlan'})
  // TODO: Add once delete endpoint is available
  // const [deletePlan, {isSuccess: deletePlanIsSuccess, isLoading: deletePlanIsLoading, error: deletePlanError, reset: resetDeletePlanResponse}] = useDeletePlanMutation({fixedCacheKey: 'deletePlan'})

  return {
    getPlansResponse,
    getPlansIsLoading,
    getPlansError,
    postPlan,
    postPlanResponse,
    postPlanIsLoading,
    postPlanError,
    resetPostPlanResponse,
    updatePlan,
    updatePlanResponse,
    updatePlanIsLoading,
    updatePlanError,
    resetUpdatePlanResponse,
  }
}
