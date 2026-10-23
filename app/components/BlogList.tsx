"use client";

import Link from "next/link";
import { markAsRead } from "../actions/readingLists";
import { ReadingListType } from "../types";

interface BlogListProps {
  read: boolean;
  blogs: ReadingListType[];
}

export default function BlogList({ read, blogs }: BlogListProps) {
  const blogItemStyle = "flex items-center gap-2 my-2 p-2 rounded-md";

  if (!blogs || blogs.length <= 0) {
    return (
      <div>
        <h4 className="text-xl font-bold mb-4">
          {read ? "Read" : "Unread"} ({blogs.length})
        </h4>
        <p
          className="mb-5"
          data-testid={read ? "empty-reading-list" : "no-unread-blogs"}
        >
          Empty List
        </p>
      </div>
    );
  }

  return (
    <div data-testid={read ? "read-section" : "unread-section"}>
      <h4 className="text-xl font-bold mb-4">
        {read ? "Read" : "Unread"} ({blogs.length})
      </h4>
      <div className="mb-5">
        <ul>
          {blogs.map((rl) => (
            <li
              key={rl.id}
              className={`${blogItemStyle} ${read ? "bg-teal-100" : "bg-amber-200"}`}
            >
              <Link
                href={`/blogs/${rl.blogId}`}
                className="text-sky-700 hover:text-sky-500 hover:underline"
              >
                {rl.blog?.title}
              </Link>
              {!read && (
                <form action={markAsRead} className="ml-auto">
                  <button
                    type="submit"
                    name="readBlog"
                    data-testid="mark-read-"
                    value={`bl-${rl.blogId}`}
                    className="text-gray-700 font-bold bg-green-500 hover:text-gray-400 hover:bg-green-400 p-2 rounded-md"
                  >
                    mark as read
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
