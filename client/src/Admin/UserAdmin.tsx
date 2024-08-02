import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PaginationUser from "./PaginationUser";
import axios from "axios";

interface User {
  users_id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: number;
}

function UserAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);

  const [userListNew, setUserListNew] = useState([]) as any;

  const fetchUser = async (pageIndex: number, pageNumber: number) => {
    await axios
      .get(
        `http://localhost:3000/api/v1/users/pagination?page_index=${pageIndex}&page_number=${pageNumber}`
      )
      .then((res) => {
        setUsers(res.data.data);
        setTotal(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  // console.log(users);

  useEffect(() => {
    fetchUser(1, 5);
  }, []);

  // Lock user
  const handleLockUser = async (id: any) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/users/${id}`, {
        status: "1",
      });

      const updatedUsers = users.map((u: any) =>
        u.users_id === id ? { ...u, status: "1" } : u
      );
      setUsers(updatedUsers);
      console.log("User locked successfully");
    } catch (err) {
      console.error("Failed to lock user:", err);
    }
  };
  // console.log(users);

  const handleUnLockUser = async (id: any) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/users/${id}`, {
        status: "0",
      });
      const updatedUsers = users.map((u: any) =>
        u.users_id === id ? { ...u, status: "0" } : u
      );
      setUsers(updatedUsers);
      console.log("User unlocked successfully");
    } catch (err) {
      console.error("Failed to lock user:", err);
    }
  };

  useEffect(() => {
    const filteredUsers = users.filter((e: any) => e.role == 0);
    setUserListNew(filteredUsers);
  }, [users]);

  return (
    <div>
      <h1>Admin User</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {userListNew.map((user: any, index: any) => (
            <tr key={user.users_id}>
              <th scope="row">{index + 1}</th>
              <td>{user.users_id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.status == 0 ? (
                  <button
                    style={{ width: "70px" }}
                    className="btn btn-outline-danger"
                    onClick={() => handleLockUser(user.users_id)}
                  >
                    Lock
                  </button>
                ) : (
                  <button
                    style={{ width: "70px" }}
                    className="btn btn-outline-success"
                    onClick={() => handleUnLockUser(user.users_id)}
                  >
                    UnLock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationUser total={total} pageNumber={5} fetchUser={fetchUser} />
    </div>
  );
}

export default UserAdmin;
