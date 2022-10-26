import {useRouter} from 'next/router'
import {Button, Modal} from 'components'
import {ButtonType, ButtonWidth, ButtonSize, ButtonBackground, LabelWeight} from 'components/Button/styles'
import {ModalStyle} from 'utils/enums'

const LogoutModal = () => {
  const router = useRouter()

  return (
    <Modal modalStyle={ModalStyle.COMPACT} modalHeader='Log out'>
      <section className='flex my-[30px] ml-[10px]'>
        <p className='font-body-3'>Are you sure you want to <b>Log out?</b></p>
      </section>
      <section className='flex justify-end border-t-[1px] border-grey-200 dark:border-grey-800 pt-[16px]'>
        <Button
          buttonType={ButtonType.SUBMIT}
          buttonSize={ButtonSize.MEDIUM}
          buttonBackground={ButtonBackground.RED}
          buttonWidth={ButtonWidth.MEDIUM}
          labelWeight={LabelWeight.REGULAR}
          handleClick={() => router.push('/api/auth/logout')}
        >Yes, log me out
        </Button>
      </section>
    </Modal>
  )
}

export default LogoutModal
