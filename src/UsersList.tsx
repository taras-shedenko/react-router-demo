import { Link, useSearchParams } from "react-router";
import type { IUser } from "./Users";

const UsersList = ({ users }: { users: IUser[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchName = searchParams.get("name") ?? "";
  const setSearchName = (name: string) => setSearchParams(name ? { name } : {});

  return (
    <>
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
    </>
  );
};

export default UsersList;
