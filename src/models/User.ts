import mongoose, { Schema, model, Document } from "mongoose";

interface UserInterface extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string;
    verfiyCodeExpiry: Date;
}

const UserSchema: Schema<UserInterface> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
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
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    verfiyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<UserInterface>) || mongoose.model<UserInterface>("User", UserSchema);

export default UserModel;