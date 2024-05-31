import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any,req: any): Promise<any> {
        if (!credentials || !credentials.email || !credentials.password) {
          console.log("Credentials not found");
          return null;
        }
        await dbConnect();
        try {
          const user = await User.findOne({
            email: credentials.email,
          });
          console.log("Credentials", credentials.email);
          console.log("User", user);
          if (!user) {
            throw new Error("No user found with ", credentials.email);
          }
          const isPasswordCorrect = await bcryptjs.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Password is incorrect");
          } else {
            return user;
          }
        } catch (error: any) {
          console.log("Error in authorize", error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isUploading = user.isUploading;
        token.username = user.username;
        token.images = user.images;
      }
      return token;
    },
    async session({session, token}) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isUploading = token.isUploading;
        session.user.username = token.username;
        session.user.images = token.images;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
