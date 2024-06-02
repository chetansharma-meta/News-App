import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import User from "@/model/User";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
    try {
    await dbConnect();
    const dataForm = await req.formData();
    const title = dataForm.get("title");
    const content = dataForm.get("content");
    const category = dataForm.get("category");
    const tags = dataForm.getAll("tags[]");
    const user = dataForm.get("user");
    const userExist = await User.findById(user);
    console.log("API LOG: ",{ title, content, category, tags, user });
    if (!userExist) {
      return NextResponse.json({ msg: "Invalid User" }, { status: 400 });
    }
    const newPost = new Article({
      title,
      content,
      category,
      tags,
      author: new mongoose.Types.ObjectId(userExist?._id as string),
    });
    await newPost.save();

    const userReturn = await User.findByIdAndUpdate(user, {
      $push: { articles: newPost._id },
    }, { new: true }
    )


    return NextResponse.json({ msg: "Post Created" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
