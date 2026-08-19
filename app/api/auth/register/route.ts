import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { prisma } from "@/lib/prisma";
// import { sql, createClient } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("Received registration data:", { email, password });
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    const hashedPassword = await hash(password, 12);
    const adduser = await prisma.users.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        adduser: adduser,
        message: "User registered successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json({ error: "Internal Server Error" });
  }
}
