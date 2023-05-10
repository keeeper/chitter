import useUsers from "@/hooks/useUsers";
import Avatar from "../Avatar";

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="p-6 hidden lg:block">
      <div className="bg-gray-50 rounded-xl p-4">
        <h2 className="text-gray-700 text-xl font-semibold">Who to follow?</h2>
        <div className="flex flex-col gap-4 mt-4">
          {users.map((user: Record<string, any>) => (
              <div className="flex flex-row gap-4" key={user.id}>
                <Avatar userId={user.id} />
                <div className="flex flex-col ">
                  <p className="font-semibold text-sm text-gray-600">{user.name}</p>
                  <p className="text-sm text-neutral-400">@{user.username}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowBar;