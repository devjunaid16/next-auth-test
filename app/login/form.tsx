"use client";

import axios from "axios";
import { SubmitEvent } from "react";
import { signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
export default function FormPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  {
    // if (session === null) {
    //   redirect("/");
    // }
  }
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
    console.log("SignIn response:", response);
  };

  return (
    <>
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

        <button type="submit">Login</button>
      </form>
      <button onClick={() => signOut()}>SignOut</button>
    </>
  );
}
