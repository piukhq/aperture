import {useGetPlansQuery, useGetPlanQuery, usePostPlanMutation, usePutPlanMutation, useDeletePlanMutation} from 'services/DirectoryPlans'

export const useDirectoryPlans = ({skipGetPlans = false, skipGetPlan = false, planRef = ''}) => {
  const {
    data: getPlansResponse,
    isLoading: getPlansIsLoading,
    error: getPlansError,
  } = useGetPlansQuery(undefined, {skip: skipGetPlans})

  const {
    data: getPlanResponse,
    isLoading: getPlanIsLoading,
    error: getPlanError,
  } = useGetPlanQuery({planRef}, {skip: skipGetPlan})

  const [postPlan, {
    data: postPlanResponse,
    isLoading: postPlanIsLoading,
    error: postPlanError,
    reset: resetPostPlanResponse,
  }] = usePostPlanMutation({fixedCacheKey: 'postPlan'})

  const [putPlan, {
    data: putPlanResponse,
    isLoading: putPlanIsLoading,
    error: putPlanError,
    reset: resetPutPlanResponse,
  }] = usePutPlanMutation({fixedCacheKey: 'putPlan'})

  const [deletePlan, {
    isSuccess: deletePlanIsSuccess,
    isLoading: deletePlanIsLoading,
    error: deletePlanError,
    reset: resetDeletePlanResponse,
  }] = useDeletePlanMutation({fixedCacheKey: 'deletePlan'})

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
    // PUT Plan
    putPlan,
    putPlanResponse,
    putPlanIsLoading,
    putPlanError,
    resetPutPlanResponse,
    // DELETE Plan
    deletePlan,
    deletePlanIsSuccess,
    deletePlanIsLoading,
    deletePlanError,
    resetDeletePlanResponse,
  }
}
