"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationProvider";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: {
      errorAuthor: "",
      errorTitle: "",
      errorUrl: "",
      success: false,
    },
    values: { author: "", title: "", url: "", success: false },
  });

  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.values.success) {
      showNotification("Blog created!");
      router.push("/blogs");
    }
  }, [state.values.success, showNotification, router]);

  return (
    <div className="max-w-2xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Create new Blog</h2>
      <form
        action={formAction}
        className="bg-gray-100 text-blue-400 px-10 py-2 mb-4 rounded"
      >
        <div className="mx-0.5 my-2 text-right max-w-4/5">
          <label>
            Title:
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={state.values?.title}
              className="bg-gray-400 border-stone-600 border-2 text-black mx-2 p-1 rounded min-w-3/5"
            />
          </label>
        </div>
        <div className="mx-0.5 my-2 text-right max-w-4/5">
          <label>
            Author:
            <input
              type="text"
              id="author"
              name="author"
              defaultValue={state.values?.author}
              className="bg-gray-400 border-stone-600 border-2 text-black mx-2 p-1 rounded min-w-3/5"
            />
          </label>
        </div>
        <div className="mx-0.5 my-2 text-right max-w-4/5">
          <label>
            Url:
            <input
              type="text"
              id="url"
              name="url"
              defaultValue={state.values?.url}
              className="bg-gray-400 border-stone-600 border-2 text-black mx-2 p-1 rounded min-w-3/5"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mx-44 bg-sky-500 hover:bg-sky-700 text-white rounded p-1"
        >
          Create
        </button>
      </form>
      {state.errors?.errorTitle && (
        <p style={{ color: "red" }}>{state.errors.errorTitle}</p>
      )}
      {state.errors?.errorAuthor && (
        <p style={{ color: "red" }}>{state.errors.errorAuthor}</p>
      )}
      {state.errors?.errorUrl && (
        <p style={{ color: "red" }}>{state.errors.errorUrl}</p>
      )}
    </div>
  );
};

export default NewBlog;
