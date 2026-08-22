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
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>
        Url: <a href={blog.url}>{blog.url}</a>
      </p>
      <form action={likeABlog}>
        <input type="hidden" name="id" value={blog.id} />
        <label>Likes: {blog.likes} </label>
        <button type="submit">Like</button>
      </form>
    </div>
  );
};

export default BlogPage;
