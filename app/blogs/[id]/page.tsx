import { notFound } from "next/navigation";
import { checkReadingList, getBlogById } from "@/app/services/blogs";
import { updateBlogStatus } from "@/app/actions/blogs";
import { auth } from "@/app/auth";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  let inReadingList = false;

  const session = await auth();
  if (session?.user?.email) {
    inReadingList = await checkReadingList(Number(id));
  }

  return (
    <div
      className="max-w-3xl mx-auto my-2 p-6 rounded bg-gray-700"
      data-testid="blog-detail"
    >
      <h2
        className="text-3xl font-bold mb-4 text-center"
        data-testid="blog-title"
      >
        {blog.title}
      </h2>
      <div className="bg-gray-100 text-gray-800 mb-2 p-2 rounded">
        <p data-testid="blog-author">Written by {blog.author}</p>
        <p>
          <a
            href={blog.url}
            className="text-sky-500 hover:text-sky-300 hover:underline"
          >
            {blog.url}
          </a>
        </p>
        <form action={updateBlogStatus} className="mt-4">
          <input type="hidden" name="id" value={blog.id} />
          <label className="bg-gray-300 text-gray-800 mb-2 p-2 rounded">
            Likes: {blog.likes}{" "}
          </label>
          <button
            type="submit"
            name="blogAction"
            value="like"
            className="bg-sky-700 hover:bg-sky-500 text-white rounded p-1.5 mx-2"
          >
            Like
          </button>
          {session?.user && !inReadingList && (
            <button
              type="submit"
              data-testid="add-to-reading-list-button"
              name="blogAction"
              value="list"
              className="bg-green-700 hover:bg-green-500 text-white rounded p-1.5 mx-2"
            >
              Add to the reading list
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default BlogPage;
