import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai"
import Button from "./Button"

interface IModalProps {
  isOpen?: boolean,
  onClose: () => void,
  onSubmit: () => void,
  title?: string,
  body?: React.ReactElement,
  footer?: React.ReactElement,
  actionLabel: string,
  disabled: boolean
}

const Modal:React.FC<IModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled
}) => {

  const handleClose = useCallback(()=>{
    if (disabled) return;
    onClose();
  }, [disabled, onClose])

  const handleSubmit = useCallback(()=>{
    if (disabled) return;
    onSubmit()
  }, [disabled, onSubmit])

  if(!isOpen) return null;

  return ( 
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-500 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl lg:h-auto">
          {/* Content */}
          <div className="relative flex flex-col w-full h-full lg:h-auto border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none">
            <header className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-3xl font-semibold text-gray-800">{title}</h3>
              <button onClick={handleClose} className="p-1 ml-auto border-0 text-gray-800 hover:opacity-70 transition"><AiOutlineClose size={20} /></button>
            </header>
            {/* Body */}
            <div className="relative p-10 flex-auto">
              {body}
            </div>
            <footer className="flex flex-col gap-2 p-10">
              <Button onClick={handleSubmit} label={actionLabel} disabled={disabled} fullwidth large />
              {footer}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;