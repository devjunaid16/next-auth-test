"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { SubmitEvent } from "react";

export default function FormPage() {
  const router = useRouter();
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await axios
      .post("/api/auth/register", {
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then((res) => {
        console.log("Response data:", res.data);
        if (res.status === 201) {
          router.push("/");
          router.refresh();
        }
      })
      .catch((error) => {
        console.error(
          "Error during registration:",
          error.response?.data || error.message,
        );
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <input
        name="email"
        className="border border-black"
        type="email"
        required
      />

      <input
        name="password"
        className="border border-black"
        type="password"
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
