import { useParams, useNavigate } from "react-router";

import type { TUser } from "./TUser";

const User = ({
  users,
  removeUser,
}: {
  users: TUser[];
  removeUser: (userId: string) => void;
}) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <h3>User: {users.find(({ id }) => id === userId)?.fullName ?? ""}</h3>
      <button
        onClick={() => {
          removeUser(userId!);
          navigate("/users");
        }}
      >
        Remove
      </button>
    </>
  );
};

export default User;
