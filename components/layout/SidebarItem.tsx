import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface ISidebarItemProps {
  label: string,
  href: string,
  icon: IconType,
  onClick?: () => void,
  auth?: boolean
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
  label, href, icon: Icon, onClick, auth
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(()=>{
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);

  return ( 
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-gray-300 hover:bg-opacity-10 cursor-pointer lg:hidden transition">
        <Icon size={28} color="dark-gray" />
      </div>
      <div className="relative hidden lg:flex items-center gap-4 px-6 py-4 w-full rounded-full hover:bg-gray-300 hover:bg-opacity-10 cursor-pointer transition">
        <Icon size={24} color="dark-gray" />
        <p className="hidden lg:block text-gray-600 text-xl">{label}</p>
      </div>
    </div>
  );
}

export default SidebarItem ;