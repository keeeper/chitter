import {useRouter} from "next/router";
import { FaComments } from 'react-icons/fa';

const SidebarLogo = () => {
  const router = useRouter();

  return ( 
    <div 
      onClick={() => router.push("/")} 
      className="flex justify-center itens-center bg-sky-300 rounded-full h-14 w-14 p-4 hover:bg-sky-500 cursor-pointer transition">
        <FaComments size={24} color="white" />
    </div>
   );
}

export default SidebarLogo;