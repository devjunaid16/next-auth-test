import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("Received credentials:", credentials);
        const verifiedUser = await prisma.users.findUnique({
          where: { email: credentials?.email },
        });
        const passwordMatch = await compare(
          credentials?.password || "",
          verifiedUser?.password || "",
        );
        if (!verifiedUser || !passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }
        if (verifiedUser && passwordMatch) {
          console.log("User verified successfully");
        }
        console.log("Verified user:", verifiedUser);

        if (verifiedUser && passwordMatch) {
          // Any object returned will be saved in `user` property of the JWT\
          console.log("User verified successfully:", verifiedUser);
          return {
            id: String(verifiedUser.id),
            email: verifiedUser.email,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
