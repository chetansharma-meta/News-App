import Reaction from "@/model/Reaction";
import Article from "@/model/Article";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  const formData = await req.formData();
  const user = formData.get("user");

  try {
    const oldReaction = await Reaction.findOne(
      { user: user, article: id}
    );
    if (oldReaction?.type === "dislike") {
      await Reaction.findByIdAndUpdate(
        oldReaction._id,
        { type: "like" },
        { new: true }
      );
      await Article.findByIdAndUpdate(
        id,
        {
          $pull: { dislikes: oldReaction._id },
          $push: { likes: oldReaction._id },
        },
        { new: true }
      );
      return new Response(JSON.stringify(oldReaction), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    const reaction = await Reaction.create({
      user: user,
      article: id,
      type: "like",
    });
    if (reaction) {
      console.log("Reaction is created");
    }
    const article = await Article.findByIdAndUpdate(
      id,
      { $push: { likes: reaction._id } },
      { new: true }
    );
    if (article) {
      console.log("Article is updated");
    }

    return new Response(JSON.stringify(reaction), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating reaction:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

