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
  const allBlogs = getBlogs();
  const blogs = searchTitle
    ? allBlogs.filter((blog) => blog.title.includes(filter))
    : allBlogs;

  return (
    <div>
      <h2>Blogs</h2>
      <Form action="">
        <input name="filter" />
        <button type="submit">Search</button>
      </Form>
      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
