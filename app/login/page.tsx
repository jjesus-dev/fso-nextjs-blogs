"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "@/app/components/NotificationProvider";

export default function LoginPage() {
  const { showNotification } = useNotification();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification("Welcome!");
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-2 p-6 rounded bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && (
        <p style={{ color: "red" }} data-testid="error-message">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 text-blue-400 p-2 mb-4 rounded flex items-center"
      >
        <div>
          <label>
            Username
            <input
              type="username"
              name="username"
              required
              className="bg-gray-400 border-stone-600 min-w-4/5 border-2 text-black mx-2 p-1 rounded"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              required
              className="bg-gray-400 border-stone-600 min-w-4/5 border-2 text-black mx-2 p-1 rounded"
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="bg-sky-500 hover:bg-sky-700 text-white rounded p-1"
        >
          Login
        </button>
      </form>
    </div>
  );
}
