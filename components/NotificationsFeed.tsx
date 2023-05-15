import { useEffect } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { FaComments } from 'react-icons/fa';

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="p-6 text-xl text-center text-gray-400">No new notifications</div>
    )
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div className="flex items-center gap-4 p-6 border-b-[1px] border-gray-200" key={notification.id}>
          <FaComments color="sky-blue-500" size={30} />
          <p className="text-gray-600">
            {notification.body}
          </p>
        </div>
      ))}
    </div>
  );
}
 
export default NotificationsFeed;