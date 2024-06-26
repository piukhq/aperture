import {DirectoryComment} from 'types'
import {CommentsSubjectTypes, CommentsOwnerTypes} from 'utils/enums'

export const determineCommentOwnerType = (commentsSubjectType: CommentsSubjectTypes) => {
  switch (commentsSubjectType) {
    case CommentsSubjectTypes.PLAN:
    case CommentsSubjectTypes.MERCHANT:
    default:
      return CommentsOwnerTypes.PLAN
    case CommentsSubjectTypes.MID:
    case CommentsSubjectTypes.LOCATION:
    case CommentsSubjectTypes.SECONDARY_MID:
    case CommentsSubjectTypes.PSIMI:
      return CommentsOwnerTypes.MERCHANT
  }
}

export const findNestedComment = (commentsArray: DirectoryComment[], commentRef: string) => (
  commentsArray.reduce((accumulator, comment) => {
    // If a match has been found and added to the accumulator, return
    if (accumulator) { return accumulator }
    if (comment.comment_ref === commentRef) { return comment }
    // Recusively search through responses
    if (comment.responses) { return findNestedComment(comment.responses, commentRef) }
  }, null)
)

export const updateCommentResponses = (comment: DirectoryComment, newReplyComment: DirectoryComment) => {
  const {responses} = comment
  return responses ? [newReplyComment, ...responses] : [newReplyComment]
}
