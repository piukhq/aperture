import {useRouter} from 'next/router'
import {useMidManagementComments} from 'hooks/useMidManagementComments'
import {Comments} from 'components'

const SingleViewComments = () => {
  const router = useRouter()
  const {ref: commentsRef} = router.query

  const {
    getCommentsResponse: comments,
    getCommentsIsLoading: isCommentsLoading,
    getCommentsError: commentsError,
  } = useMidManagementComments({commentsRef})

  return (
    <div className='pb-[10px]'>
      {comments && <Comments comments={comments} isSingleView />}
      {isCommentsLoading && <p className='font-body-4'>Comments loading ...</p>}
      {commentsError && <p className='font-body-4'>Error retrieving comments, try again later</p>}
    </div>
  )
}

export default SingleViewComments
