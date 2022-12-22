type Props = {
  percentage: number,
  width: number,
}

const LoadingBar = ({percentage, width}: Props) => {


  const getAnimation = () => {
    if (percentage === 100) {
      return 'animate-slideGreen bg-green'
    } else if (percentage > 90) {
      return 'animate-slideYellow bg-yellow'
    } else {
      return 'animate-slideOrange bg-orange'
    }
  }

  return (
    <div className={`w-[${width}px] bg-gray-900 rounded-lg shadow-md bg-grey-400/25`}>
      <p className={`origin-left font-heading-7 text-center rounded-md ${getAnimation()}`}>
        <span className='animate-fadeIn px-2'>
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
