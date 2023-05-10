import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from 'react-icons/bi';

interface IHeaderProps {
  label: string,
  showBackArrow?: boolean
}

const Header:React.FC<IHeaderProps> = ({label, showBackArrow}) => {
  const router = useRouter();
  const handleBack = useCallback(()=>{
    router.back();
  }, [router])

  return ( 
    <div className="border-b-[1px] border-gray-300 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && 
          (
            <BiArrowBack onClick={handleBack} color="gray" size={20} className="cursor-pointer hover:opacity-70 tranistion" />
          )
        }
        <h1 className="text-gray-600 text-xl font-semibold">{label}</h1>
      </div>
    </div>
   );
}

export default Header;