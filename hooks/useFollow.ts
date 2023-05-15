import { toast } from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";

const useFollow = (userId: string) => {
  const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
  const { mutate: mutateFetchedUser, data: followedUser } = useUser(userId);
  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);
  
  const toggleFollow = useCallback(async ()=>{
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { params: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId })
      }
      
      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      if (isFollowing) {
        toast.success(`You are not follwing @${followedUser.username} anymore`);
      } else {
        toast.success(`Now you are follwing @${followedUser.username}`);
      }
      

    } catch(error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [userId, currentUser, isFollowing, mutateCurrentUser, mutateFetchedUser, loginModal]);

  return {
    isFollowing,
    toggleFollow
  }
}

export default useFollow;