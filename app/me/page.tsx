import { generateUserToken } from "../actions/users";
import { getReadingListByUser } from "../actions/readingLists";
import BlogList from "../components/BlogList";
import { getCurrentUser } from "../services/session";
import { redirect } from "next/navigation";

const MePage = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const readingList = await getReadingListByUser(user.id);

  const unreadBlogs = readingList?.filter((b) => b.read === false);
  const readBlogs = readingList?.filter((b) => b.read === true);

  return (
    <div
      className="max-w-2xl mx-auto my-2 p-6 rounded bg-gray-700"
      data-testid="user-profile"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <div className="bg-gray-100 text-gray-800 px-4 py-2 mb-4 rounded">
        <p data-testid="user-name">{user?.name}</p>
        <p data-testid="user-username">{user?.username}</p>
        <hr className="my-4" />
        <div data-testid="reading-list-section">
          <h3 className="text-2xl font-bold mb-4">Reading List</h3>

          <BlogList read={false} blogs={unreadBlogs || []} />
          <BlogList read={true} blogs={readBlogs || []} />
        </div>

        <hr className="my-4" />
        <h3 className="text-2xl font-bold mb-4">API Token</h3>
        <form action={generateUserToken}>
          <div
            className="bg-gray-300 p-3 rounded"
            data-testid="api-token-section"
          >
            <div data-testid="token-display">
              {user?.token ? (
                <div>
                  <span>Current token:</span>
                  <span
                    data-testid="api-token"
                    className="bg-gray-400 text-gray-200 border-stone-400 border-2 mx-2 p-1 rounded min-w-3/5"
                  >
                    {user?.token}
                  </span>
                </div>
              ) : (
                <div data-testid="no-token-message">There is no token yet</div>
              )}
            </div>

            <button
              type="submit"
              data-testid="generate-token-button"
              className="mx-4 bg-sky-500 hover:bg-sky-700 text-white rounded p-1"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MePage;
