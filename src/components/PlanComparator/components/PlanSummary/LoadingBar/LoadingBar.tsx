type Props = {
  percentage: number,
}

const LoadingBar = ({percentage}: Props) => {
  const getAnimation = () => {
    if (percentage === 100) {
      return 'animate-slideGreen bg-green'
    } else if (percentage > 90) {
      return 'animate-slideYellow bg-yellow dark:bg-yellow/75'
    } else {
      return 'animate-slideOrange bg-orange'
    }
  }

  return (
    <div className={'w-[500px] rounded-lg bg-grey-400/25 border border-grey-400 dark:border-grey-700'}>
      <p className={`origin-left font-heading-7 text-white p-2 text-center rounded-md ${getAnimation()}`}>
        <span className='animate-fadeIn delay-1000 px-2'>
          {Math.round(percentage)}% match
        </span>
      </p>
      <style jsx>{
        `p {width: ${percentage}%;}`}
      </style>
    </div>
  )
}

export default LoadingBar
