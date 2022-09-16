import {useEffect} from 'react'
import {useAppDispatch} from 'app/hooks'
import {
  useGetCommentsQuery,
  usePostCommentMutation,
  midManagementCommentsApi,
} from 'services/midManagementComments'

export const useMidManagementComments = ({commentsRef}) => {
  const {data: getCommentsResponse, isLoading: getCommentsIsLoading, error: getCommentsError} = useGetCommentsQuery({commentsRef})

  const [postComment, {
    data: postCommentResponse,
    isLoading: postCommentIsLoading,
    isSuccess: postCommentIsSuccess,
    error: postCommentError,
    reset: resetPostCommentResponse,
  }] = usePostCommentMutation({fixedCacheKey: 'postComment'})

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
  }
}
