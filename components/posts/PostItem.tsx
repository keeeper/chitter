import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

interface IPostItemProps {
  userId: string;
  data: Record<string, any>
}

const PostItem:React.FC<IPostItemProps> = ({userId, data}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();
    router.push(`/users/${data.user.id}`);
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback((event: any) => {
    event.stopPropagation();
    loginModal.onOpen();
  }, [loginModal]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    } 

    return formatDistanceToNowStrict(new Date(data?.createdAt))
  }, [data?.createdAt])

  return (
    <div className="p-5 border-b-[1px] border-gray-200 cursor-pointer transition hover:bg-gray-50" onClick={goToPost}>
      <div className="flex items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold text-gray-600 cursor-pointer hover:underline" onClick={goToUser}>{data.user.name}</p>
            <span className="text-neutral-400 cursor-pointer hidden hover:underline md:block" onClick={goToUser}>@{data.user.username}</span>
            <span className="text-neutral-400 text-sm">{createdAt}</span>
          </div>
          <div className="mt-1 text-gray-600">
            {data.body}
          </div>
          <div className="flex items-center gap-5 mt-3">
            <div className="flex items-center gap-2 text-neutral-400 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div className="flex items-center gap-2 text-neutral-400 cursor-pointer transition hover:text-red-500" onClick={onLike}>
              <AiOutlineHeart size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default PostItem;