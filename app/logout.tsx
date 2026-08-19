"use client";
import { signOut } from "next-auth/react";
export default function logout() {
  return (
    <span style={{ cursor: "pointer" }}
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </span>
  );
}
