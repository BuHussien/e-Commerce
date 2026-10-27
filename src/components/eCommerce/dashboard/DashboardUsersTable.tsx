import { useAppDispatch, useAppSelector } from "@store/hooks";
import type { TUser } from "@customTypes/user";
import actUpdateUserRole from "@store/users/act/actUpdateUserRole";

interface IProps {
  canManageRoles: boolean;
}

const DashboardUsersTable = ({ canManageRoles }: IProps) => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  const currentUser = useAppSelector((state) => state.auth.user);

  const handleRoleChange = async (user: TUser, role: TUser["role"]) => {
    if (!canManageRoles || user.role === role) return;

    // Protect the GreatAdmin account from accidental demotion.
    if (user.id === currentUser?.id) return;

    try {
      await dispatch(actUpdateUserRole({ id: user.id, role })).unwrap();
    } catch {
      // The rejected action updates the Redux error state.
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">User ID</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading === "pending" ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : error && users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50/70">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
                        {user.firstname?.charAt(0).toUpperCase()}
                        {user.lastname?.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-medium text-gray-900">
                        {user.firstname} {user.lastname}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {canManageRoles && user.id !== currentUser?.id ? (
                      <select
                        value={user.role}
                        onChange={(event) =>
                          handleRoleChange(user, event.target.value as TUser["role"])
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        aria-label={`Change role for ${user.firstname} ${user.lastname}`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          (user.role === "admin" || user.role === "greatAdmin")
                            ? "bg-violet-50 text-violet-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                    #{user.id}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && users.length > 0 && (
        <p role="alert" className="border-t border-red-100 px-6 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="border-t border-gray-100 px-6 py-4 text-sm text-gray-500">
        Total users:{" "}
        <span className="font-semibold text-gray-900">{users.length}</span>
      </div>
    </section>
  );
};

export default DashboardUsersTable;