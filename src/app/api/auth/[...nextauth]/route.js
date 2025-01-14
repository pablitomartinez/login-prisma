import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        console.log("credenciales", credentials);

        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound)  return null;
        console.log('user encontrado',userFound);


        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);
        if (!matchPassword) return null;
        return {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email, 
        };
      },
      secret: process.env.NEXTAUTH_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
