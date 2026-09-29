import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-3xl font-bold mb-4 text-center">{user.name}</h2>
      <div className="bg-gray-100 text-gray-800 mb-2 p-2 rounded">
        <p className="bg-gray-300 mb-2 p-2 rounded text-center">
          User: {user.username}
        </p>
        <h3 className="text-2xl font-bold mt-4">Blogs:</h3>
        <ul className="list-disc list-inside">
          {user?.blogs.map((blog) => (
            <li
              key={blog.id}
              className="hover:bg-sky-600 hover:text-gray-100 p-1 rounded"
            >
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
