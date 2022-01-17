import { Error } from '../Typography'

interface ButtonType {
  large?: boolean,
  small?: boolean,
  icon?: boolean,
  circular?: boolean,
  handleClick: any,
  develop?: boolean,
  staging?: boolean,
  sandbox?: boolean,
  production?: boolean,
  error?: string,
  children: any,
}
const Button = ({ 
   large,
   small, 
   icon,
   circular,
   develop,
   staging,
   sandbox,
   production,
   handleClick,
   error,
   children,
}: ButtonType) => {
  return (
    <>
      <button className={
        `${large && 'w-112 h-12 bg-primaryGreen text-white rounded-md'}
         ${small && 'w-32 h-12 bg-primaryGreen text-white rounded-md'}
         ${icon && 'w-12 h-12 bg-primaryGreen text-white rounded-md pt-2'}
         ${circular && 'w-12 h-12 pt-2 border-2 border-outlineGrey bg-white rounded-full'}
         ${develop && 'w-7 h-7 bg-envDevBg text-envDevFg leading-7 border border-envDevFg rounded-md font-bold'}
         ${staging && 'w-7 h-7 bg-envStagingBg text-envStagingFg leading-7 border border-envStagingFg rounded-md font-bold'}
         ${sandbox && 'w-7 h-7 bg-envSandboxBg text-envSandboxFg leading-7 border border-envSandboxFg rounded-md font-bold'}
         ${production && 'w-7 h-7 bg-envProdBg text-envProdFg leading-7 border border-envProdFg rounded-md font-bold'}
         `
        }
        onClick={handleClick}
      >
       {children}
      </button>

      { error && (
        <div>
          <Error>{error}</Error>
        </div>
      )}
    </>
  )
}

export default Button
