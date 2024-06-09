import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  articles: string[];
  comments: string[];
  verifyCode: string;
  verfiyCodeExpiry: Date;
}

const UserSchema: Schema<User> = new Schema({
  firstname: {
    type: String,
    required: [true, "FirstName is required"],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, "LastName is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please fill a valid email address"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  articles: [{
    type: Schema.Types.ObjectId,
    ref: "Article"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"]
  },
  verfiyCodeExpiry: {
    type: Date,
    required: [true, "Verify code expiry is required"]
  },
})

  const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

  export default UserModel;