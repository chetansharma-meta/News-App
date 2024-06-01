import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    firstname?: string;
    lastname?: string;
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      firstname?: string;
      lastname?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    firstname?: string;
    lastname?: string;
  }
}