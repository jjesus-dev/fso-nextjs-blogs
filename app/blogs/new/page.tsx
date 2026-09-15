"use client";

import { useActionState } from "react";
import { createBlog } from "@/app/actions/blogs";
import { InitialStateType } from "@/app/types";

const NewBlog = (initialState: InitialStateType) => {
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <div>
      <h2>Create new Blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title:
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={state.values?.title}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              id="author"
              name="author"
              defaultValue={state.values?.author}
            />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input
              type="text"
              id="url"
              name="url"
              defaultValue={state.values?.url}
            />
          </label>
        </div>

        <button type="submit">Create</button>
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
