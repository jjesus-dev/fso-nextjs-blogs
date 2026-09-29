import { notFound } from "next/navigation";
import { getBlogById } from "@/app/services/blogs";
import { likeABlog } from "@/app/actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-3xl font-bold mb-4 text-center">{blog.title}</h2>
      <div className="bg-gray-100 text-gray-800 mb-2 p-2 rounded">
        <p>Author: {blog.author}</p>
        <p>
          Url:{" "}
          <a
            href={blog.url}
            className="text-sky-500 hover:text-sky-300 hover:underline"
          >
            {blog.url}
          </a>
        </p>
        <form action={likeABlog} className="mt-4">
          <input type="hidden" name="id" value={blog.id} />
          <label className="bg-gray-300 text-gray-800 mb-2 p-2 rounded">
            Likes: {blog.likes}{" "}
          </label>
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-500 text-white rounded p-1.5 mx-2"
          >
            Like
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPage;
