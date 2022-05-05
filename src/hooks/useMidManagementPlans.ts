import {usePostPlanMutation} from 'services/midManagementPlans'

export const useMidManagementPlans = () => {
  const [postPlan, {data: postPlanResponse, isLoading: postPlanIsLoading, error: postPlanError, reset: resetPostPlanResponse}] = usePostPlanMutation({fixedCacheKey: 'postPlan'})

  return {
    postPlan,
    postPlanResponse,
    postPlanIsLoading,
    postPlanError,
    resetPostPlanResponse,
  }
}
