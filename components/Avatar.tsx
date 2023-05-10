import useUser from "@/hooks/useUser";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface IAvatarProps {
  userId: string,
  isLarge?: boolean,
  hasBorder?: boolean
}

const Avatar:React.FC<IAvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const {data: fetchedUser} = useUser(userId);

  const onClick = useCallback((event: any) => {
    event.stopPropagation();
    const url = `/users/${userId}`;
    router.push(url);
  }, [])

  return (
    <div className={`${hasBorder ? 'border-4 border-white' : ''} ${isLarge ? 'w-32 h-32' : 'w-12 h-12'} relative rounded-full hover: opacity-90 transition cursor-pointer`}>
      <Image 
        fill 
        alt="Avatar"
        onClick={onClick}
        style={{
          objectFit: 'cover',
          borderRadius: '100%'
        }} 
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
}

export default Avatar;