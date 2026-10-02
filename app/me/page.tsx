"use client";

import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateUserToken, getToken } from "../actions/users";

export default function MePage() {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState<any>(null);

  // const { showNotification } = useNotification();
  // const router = useRouter();

  useEffect(() => {
    if (!session) {
      notFound();
    }

    getToken(session.user?.email || "").then(setUserInfo);
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
        <h3 className="text-2xl font-bold mb-4">API Token</h3>
        <form action={generateUserToken}>
          <div className="bg-gray-300 p-3 rounded">
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={userInfo?.username || ""}
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
