import {CommentsSubjectTypes, CommentsOwnerTypes} from 'utils/enums'

export const determineCommentOwnerType = (commentsSubjectType: CommentsSubjectTypes) => {
  switch (commentsSubjectType) {
    case CommentsSubjectTypes.PLAN:
    case CommentsSubjectTypes.MERCHANT:
      return CommentsOwnerTypes.PLAN
    case CommentsSubjectTypes.MID:
    case CommentsSubjectTypes.LOCATION:
    case CommentsSubjectTypes.SECONDARY_MID:
    case CommentsSubjectTypes.PSIMI:
      return CommentsOwnerTypes.MERCHANT
    default: return CommentsOwnerTypes.PLAN
  }
}
