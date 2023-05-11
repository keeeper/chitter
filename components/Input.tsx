interface IInputProps {
  placeholder?: string,
  value?: string,
  type?: string,
  disabled: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  label?: string
}

const Input:React.FC<IInputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange
}) => {
  return ( 
    <input 
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full
        p-4
        text-lg
        bg-white
        border-2
        border-gray-200
        rounded-md
        outline-none
        text-gray-600
        focus:border-sky-500
        focus:border-2
        transition
        disabled:bg-neutral-200
        disabled:opacity-70
        disabled:cursor-not-allowed
      "/>
  );
}

export default Input ;