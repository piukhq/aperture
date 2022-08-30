import {DirectoryComments} from 'types'

type Props = {
    comments: DirectoryComments
}

const Comments = ({comments}: Props) => {
  return (
    <div className='ml-[32px] mr-[5px] h-[100px]'>
      <h3 className='font-modal-heading'>PLAN</h3>

      <div className='bg-[#e2e2ea] rounded-[20px] w-[100%] h-[71px]'>
        <p>COMMENT</p>
      </div>
    </div>
  )
}

export default Comments
