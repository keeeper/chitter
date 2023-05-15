import { format } from "date-fns";
import { useMemo } from "react";
import useUser from "@/hooks/useUser";
import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useFollow from "@/hooks/useFollow";

interface IUserBioProps {
  userId: string
}

const UserBio:React.FC<IUserBioProps> = ({userId}) => {
  const {data: currentUser} = useCurrentUser();
  const {data: fetchedUser} = useUser(userId);

  const editModal = useEditModal();

  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo (() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt])

  
  return (
    <div className="border-b-[1px] border-gray-300 pb-4">
      <div className="flex justify-end p-2">
      {currentUser?.id === userId ? (
        <Button secondary label="Edit" onClick={editModal.onOpen} />
      ) : (
        <Button secondary={isFollowing} label={isFollowing ? "Unfollow" : "Follow"} onClick={toggleFollow} />
      )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="font-semibold text-2xl text-gray-600">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-400">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-gray-600">
            {fetchedUser?.bio}
          </p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
            <BiCalendar size={24} />
            <p>
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-neutral-600">{fetchedUser?.followingIds?.length }</p>
            <p className="text-neutral-400">following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-neutral-600">{fetchedUser?.followersCount || 0}</p>
            <p className="text-neutral-400">followers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default UserBio;