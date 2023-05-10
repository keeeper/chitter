interface IButtonProps {
  label: string,
  secondary?: boolean,
  fullwidth?: boolean,
  large?: boolean,
  onClick: () => void,
  disabled?: boolean,
  outline?: boolean
}

const Button:React.FC<IButtonProps> = ({
  label,
  secondary,
  fullwidth,
  large,
  onClick,
  disabled,
  outline
}) => {
  return ( 
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-full
      font-semibold
      hover:opacity-80
      transition
      border-2
      ${fullwidth ? 'full' : 'w-fit'}
      ${secondary ? 'bg-gray-600' : 'bg-sky-500'}
      ${secondary ? 'text-white' : 'text-white'}
      ${secondary ? 'bg-gray-600' : 'border-sky-500'}
      ${large ? 'text-xl' : 'text-md'}
      ${large ? 'px-5' : 'px-4'}
      ${large ? 'py-3' : 'py-2'}
      ${outline ? 'bg-transparent' : ''}
      ${outline ? 'border-black' : ''}
      ${outline ? 'text-black' : ''}
    `}>
      {label}
    </button>
   );
}

export default Button;