import dbConnect from "@/lib/dbConnect";
import Comment from "@/model/Comment";
import User from "@/model/User";
import Article from "@/model/Article";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<void | Response> {
  await dbConnect();
  try {
    const formData = await req.formData();
    const content = formData.get("comment");
    const user = formData.get("user");
    const article = formData.get("article");
    const comment = new Comment({
      content: content,
      user: user,
      article: article,
    });
    await comment.save();
    if (comment) {
      const userDB = await User.findByIdAndUpdate(user, {
        $push: { comments: comment._id },
      });
      if (userDB) {
        console.log("Comment User: ", userDB);
        const articleDB = await Article.findByIdAndUpdate(article, {
          $push: { comments: comment._id },
        });
        if (articleDB) {
          console.log("Comment Article: ", articleDB);
          return new NextResponse(JSON.stringify(comment), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        }
      }
    }
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("Error", error);
    return new NextResponse(
      JSON.stringify({ message: "Error in creating comment" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
