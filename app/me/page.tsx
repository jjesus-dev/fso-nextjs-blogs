"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateUserToken, getToken } from "../actions/users";
import { getReadingListByUser, markAsRead } from "../actions/readingLists";

type ReadingList = {
  id: number;
  userId: number;
  read: boolean;
  blogId: number;
  blog: { title: string; author: string; url: string } | null;
};

export default function MePage() {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<{
    username: string;
    token: string | null;
  }>({ username: "", token: "" });
  const [readingList, setReadingList] = useState<ReadingList[]>();

  useEffect(() => {
    if (!session) {
      notFound();
    }

    getToken(session.user?.email || "").then(setUserInfo);

    const fetchList = async () => {
      await getReadingListByUser(session.user?.email || "-1").then(
        setReadingList,
      );
    };

    fetchList();
  }, [session]);

  return (
    <div className="max-w-2xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <div className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded">
        <p>
          <strong>Name: </strong>
          {session?.user?.name}
        </p>
        <p>
          <strong>Username: </strong>
          {session?.user?.email}
        </p>
        <hr className="my-4" />
        <div>
          <h3 className="text-2xl font-bold mb-4">Reading List</h3>
          <div>
            <h4 className="text-xl font-bold mb-4">
              Unread ({readingList?.filter((b) => b.read === false).length})
            </h4>
            <div className="mb-5">
              <ul>
                {readingList &&
                  readingList
                    .filter((b) => b.read === false)
                    .map((rl) => (
                      <li
                        key={rl.id}
                        className="flex items-center gap-2 bg-amber-200 my-2 p-2 rounded-md"
                      >
                        <Link
                          href={`/blogs/${rl.blogId}`}
                          className="text-sky-700 hover:text-sky-500 hover:underline"
                        >
                          {rl.blog?.title}
                        </Link>{" "}
                        <form action={markAsRead} className="ml-auto">
                          <button
                            type="submit"
                            name="readBlog"
                            value={`bl-${rl.blogId}`}
                            className="text-gray-700 font-bold bg-green-500 hover:text-gray-400 hover:bg-green-400 p-2 rounded-md"
                          >
                            mark as read
                          </button>
                        </form>
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">
              Read ({readingList?.filter((b) => b.read === true).length})
            </h4>
            <div>
              <ul>
                {readingList &&
                  readingList
                    .filter((b) => b.read === true)
                    .map((rl) => (
                      <li
                        key={rl.id}
                        className="flex items-center gap-2 bg-teal-100 my-2 p-2 rounded-md"
                      >
                        <Link
                          href={`/blogs/${rl.blogId}`}
                          className="text-sky-700 hover:text-sky-500 hover:underline"
                        >
                          {rl.blog?.title}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <h3 className="text-2xl font-bold mb-4">API Token</h3>
        <form action={generateUserToken}>
          <div className="bg-gray-300 p-3 rounded">
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={userInfo?.username}
              readOnly={true}
              hidden={true}
              className="bg-gray-400 text-gray-200 border-stone-400 border-2 mx-2 p-1 rounded min-w-3/5 hidden"
            />

            <label>
              Current token:
              <input
                type="text"
                id="token"
                name="token"
                defaultValue={userInfo?.token || ""}
                className="bg-gray-400 text-gray-200 border-stone-400 border-2 mx-2 p-1 rounded min-w-3/5"
              />
            </label>

            <button
              type="submit"
              className="mx-4 bg-sky-500 hover:bg-sky-700 text-white rounded p-1"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
