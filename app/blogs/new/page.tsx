"use client";

import { createBlog } from "@/app/actions/blogs";
import { useActionState } from "react";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" });

  return (
    <div>
      <h2>Create new Blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title:
            <input type="text" name="title" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input type="text" name="author" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input type="text" name="url" required minLength={5} />
          </label>
        </div>

        <button type="submit">Create</button>
      </form>
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </div>
  );
};

export default NewBlog;
