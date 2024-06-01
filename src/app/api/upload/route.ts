import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Article from "@/model/Article";
import User from "@/model/User";

export const POST = async (req: NextRequest) => {
    try {
    await dbConnect();
    const dataForm = await req.formData();
    const title = dataForm.get("title");
    const content = dataForm.get("content");
    const category = dataForm.get("category");
    const tags = dataForm.getAll("tags[]");
    const user = dataForm.get("user");
    console.log("API LOG: ",{ title, content, category, tags, user });
    const article = new Article({
      title,
      content,
      category,
      tags,
      author: user,
    });
    await article.save();

    console.log({ article });
    
    const ArticleUser = await User.findByIdAndUpdate(user, {
        $push: { articles: article._id },
    })
    console.log({ ArticleUser });

    return NextResponse.json({ msg: "Post Created" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
