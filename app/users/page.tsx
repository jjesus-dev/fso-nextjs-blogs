import Link from "next/link";
import { getUsers } from "../services/users";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="max-w-2xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="bg-gray-100 text-gray-800 mb-2 p-2 rounded">
        {users.map((user) => (
          <li
            key={user.id}
            className="hover:bg-sky-600 hover:text-gray-100 p-1 rounded"
          >
            <Link href={`/users/${user.username}`}>&gt; {user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
