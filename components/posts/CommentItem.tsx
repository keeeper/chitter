import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface ICommentItem {
  data: Record<string, any>
}

const CommentItem:React.FC<ICommentItem> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();
    router.push(`/users/${data.user.id}`);
  }, [router, data.user.id]);

  const createdAt = useMemo(()=> {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt])

  return (
    <div className="p-5 border-b-[1px] border-gray-200 cursor-pointer hover:bg-gray-50 transition">
      <div className="flex items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-600 cursor-pointer hover:underline" onClick={goToUser}>{data.user.name}</p>
            <span className="hidden md:block text-sm text-neutral-400">@{data.user.username}</span>
            <span className="text-sm text-neutral-400">{createdAt}</span>
          </div>
          <div className="mt-1 text-gray-600">
            {data.body}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CommentItem;