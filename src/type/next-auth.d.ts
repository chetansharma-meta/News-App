import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    isVerified?: boolean;
    isUploading?: boolean;
    username?: string;
    images?: string[];
  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isUploading?: boolean;
      username?: string;
      images?: string[];
    } & DefaultSession["user"];
  }
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isUploading?: boolean;
    username?: string;
    images?: string[];  
  }
}