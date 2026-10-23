import Form from "next/form";
import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const searchTitle = filter && filter !== "";
  const allBlogs = await getBlogs();
  const blogs = searchTitle
    ? allBlogs.filter((blog) => blog.title.includes(filter))
    : allBlogs;

  return (
    <div className="max-w-2xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <Form action="" className="bg-gray-100 text-blue-400 p-2 mb-4 rounded">
        <input
          name="filter"
          data-testid="filter-input"
          className="bg-gray-400 border-stone-600 min-w-4/5 border-2 text-black mx-2 p-1 rounded"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-sky-500 hover:bg-sky-700 text-white rounded p-1"
        >
          Search
        </button>
      </Form>
      <ul
        className="list-disc list-inside bg-gray-100 text-gray-800 mb-2 p-2 rounded"
        data-testid="blogs-list"
      >
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li
              key={blog.id}
              className="hover:bg-sky-600 hover:text-gray-100 p-1 rounded"
            >
              <Link href={`/blogs/${blog.id}`}>
                {blog.title} <span>{blog.likes} likes</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
