import { Routes, Route } from "react-router";
import UsersList from "./UsersList";
import UserItem from "./UserItem";

export type IUser = {
  id: string;
  fullName: string;
};

const Users = ({
  users,
  removeUser,
}: {
  users: IUser[];
  removeUser: (userId: string) => void;
}) => (
  <>
    <h2>Users</h2>
    <Routes>
      <Route index element={<UsersList users={users} />} />
      <Route
        path=":userId"
        element={<UserItem users={users} removeUser={removeUser} />}
      />
    </Routes>
  </>
);

export default Users;
