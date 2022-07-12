import {useGetPlansQuery, useGetPlanQuery, usePostPlanMutation, useUpdatePlanMutation} from 'services/midManagementPlans'

export const useMidManagementPlans = ({skipGetPlans = false, skipGetPlan = false, planRef = ''}) => {
  const {data: getPlansResponse, isLoading: getPlansIsLoading, error: getPlansError} = useGetPlansQuery(null, {skip: skipGetPlans})

  const {data: getPlanResponse, isLoading: getPlanIsLoading, error: getPlanError} = useGetPlanQuery({planRef}, {skip: skipGetPlan})

  const [postPlan,
    {data: postPlanResponse, isLoading: postPlanIsLoading, error: postPlanError, reset: resetPostPlanResponse},
  ] = usePostPlanMutation({fixedCacheKey: 'postPlan'})

  const [updatePlan,
    {data: updatePlanResponse, isLoading: updatePlanIsLoading, error: updatePlanError, reset: resetUpdatePlanResponse},
  ] = useUpdatePlanMutation({fixedCacheKey: 'updatePlan'})
  // TODO: Add once delete endpoint is available
  // const [deletePlan, {isSuccess: deletePlanIsSuccess, isLoading: deletePlanIsLoading, error: deletePlanError, reset: resetDeletePlanResponse}] = useDeletePlanMutation({fixedCacheKey: 'deletePlan'})

  return {
    // GET Plans
    getPlansResponse,
    getPlansIsLoading,
    getPlansError,
    // GET Plan
    getPlanResponse,
    getPlanIsLoading,
    getPlanError,
    // POST Plan
    postPlan,
    postPlanResponse,
    postPlanIsLoading,
    postPlanError,
    resetPostPlanResponse,
    // UPDATE Plan
    updatePlan,
    updatePlanResponse,
    updatePlanIsLoading,
    updatePlanError,
    resetUpdatePlanResponse,
  }
}
