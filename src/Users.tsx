import { Link, Outlet, useSearchParams } from "react-router";

import type { TUser } from "./TUser";

const Users = ({ users }: { users: TUser[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchName = searchParams.get("name") ?? "";
  const setSearchName = (name: string) => setSearchParams(name ? { name } : {});
  return (
    <>
      <h2>Users</h2>
      <input
        type="text"
        value={searchName}
        onChange={(event) => setSearchName(event.target.value)}
      />
      <ul style={{ listStyle: "none", paddingInline: 0 }}>
        {users
          .filter(({ fullName }) =>
            fullName.toLowerCase().includes(searchName.toLowerCase())
          )
          .map((user) => (
            <li key={user.id}>
              <Link to={`${user.id}`}>{user.fullName}</Link>
            </li>
          ))}
      </ul>
      <Outlet />
    </>
  );
};

export default Users;
