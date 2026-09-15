"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";
import { UserInitialStateType } from "../types";

export default function RegisterPage(initialState: UserInitialStateType) {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Name:
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={state.values?.name}
            />
          </label>
        </div>
        <div>
          <label>
            Username:
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={state.values?.username}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={state.values?.password}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              defaultValue={state.values?.passwordConfirm}
            />
          </label>
        </div>
        <button type="submit">Register</button>
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
