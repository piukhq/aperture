import {useEffect} from 'react'
import {useAppDispatch} from 'app/hooks'
import {
  useGetCommentsQuery,
  usePostCommentMutation,
  useDeleteCommentMutation,
  usePatchCommentMutation,
  midManagementCommentsApi,
} from 'services/midManagementComments'

export const useMidManagementComments = ({skipGetComments = false, commentsRef = ''}) => {
  const {data: getCommentsResponse, isLoading: getCommentsIsLoading, error: getCommentsError} = useGetCommentsQuery({commentsRef}, {skip: skipGetComments})

  const [postComment, {
    data: postCommentResponse,
    isLoading: postCommentIsLoading,
    isSuccess: postCommentIsSuccess,
    error: postCommentError,
    reset: resetPostCommentResponse,
  }] = usePostCommentMutation({fixedCacheKey: 'postComment'})

  const [deleteComment, {
    data: deleteCommentResponse,
    isLoading: deleteCommentIsLoading,
    isSuccess: deleteCommentIsSuccess,
    error: deleteCommentError,
    reset: resetDeleteCommentResponse,
  }] = useDeleteCommentMutation({fixedCacheKey: 'deleteComment'})


  const [patchComment, {
    data: patchCommentResponse,
    isLoading: patchCommentIsLoading,
    isSuccess: patchCommentIsSuccess,
    error: patchCommentError,
    reset: resetPatchCommentResponse,
  }] = usePatchCommentMutation({fixedCacheKey: 'patchComment'})

  const dispatch = useAppDispatch()

  // Remove cached comments data when relevant component unmounts
  useEffect(() => {
    return () => {
      dispatch(midManagementCommentsApi.util.resetApiState())
    }
  }, [dispatch])

  return {
    // GET Comments
    getCommentsResponse,
    getCommentsIsLoading,
    getCommentsError,
    // POST Comment
    postComment,
    postCommentResponse,
    postCommentIsLoading,
    postCommentIsSuccess,
    postCommentError,
    resetPostCommentResponse,
    // DELETE Comment
    deleteComment,
    deleteCommentResponse,
    deleteCommentIsLoading,
    deleteCommentIsSuccess,
    deleteCommentError,
    resetDeleteCommentResponse,
    // PATCH Comment
    patchComment,
    patchCommentResponse,
    patchCommentIsLoading,
    patchCommentIsSuccess,
    patchCommentError,
    resetPatchCommentResponse,
  }
}
