import Article from "@/model/Article";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    console.log("Route hit fetching articles");
    const articles = await Article.find()
      .select(
        "title content category tags author updatedAt likes dislikes comments"
      )
      .populate("author", "firstname lastname email");
    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
