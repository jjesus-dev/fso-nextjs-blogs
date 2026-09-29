"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";
import { UserInitialStateType } from "../types";

export default function RegisterPage(initialState: UserInitialStateType) {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="max-w-2xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form
        action={formAction}
        className="bg-gray-100 text-blue-400 px-10 py-2 mb-4 rounded"
      >
        <div className="mx-0.5 my-2 text-right max-w-4/5">
          <label>
            Name:
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={state.values?.name}
              className="bg-gray-400 border-stone-600 border-2 text-black mx-2 p-1 rounded min-w-3/5"
            />
          </label>
        </div>
        <div className="mx-0.5 my-2 text-right max-w-4/5">
          <label>
            Username:
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={state.values?.username}
              className="bg-gray-400 border-stone-600 border-2 text-black mx-2 p-1 rounded min-w-3/5"
            />
          </label>
        </div>
        <div className="mx-0.5 my-2 text-right max-w-4/5">
          <label>
            Password:
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={state.values?.password}
              className="bg-gray-400 border-stone-600 border-2 text-black mx-2 p-1 rounded min-w-3/5"
            />
          </label>
        </div>
        <div className="mx-0.5 my-2 text-right max-w-4/5">
          <label>
            Confirm Password:
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              defaultValue={state.values?.passwordConfirm}
              className="bg-gray-400 border-stone-600 border-2 text-black mx-2 p-1 rounded min-w-3/5"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mx-44 bg-sky-500 hover:bg-sky-700 text-white rounded p-1"
        >
          Register
        </button>
      </form>
      {state.errors?.name && (
        <p style={{ color: "red" }}>{state.errors.name}</p>
      )}
      {state.errors?.username && (
        <p style={{ color: "red" }}>{state.errors.username}</p>
      )}
      {state.errors?.password && (
        <p style={{ color: "red" }}>{state.errors.password}</p>
      )}
      {state.errors?.passwordConfirm && (
        <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>
      )}
    </div>
  );
}
