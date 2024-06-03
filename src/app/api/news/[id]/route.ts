import dbConnect from "@/lib/dbConnect";
import Article from "@/model/Article";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return new Response(JSON.stringify({ message: "Article not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const dataForm = await req.formData();
  const id = dataForm.get("id");
  const title = dataForm.get("title");
  const content = dataForm.get("content");
  const category = dataForm.get("category");
  const tags = dataForm.getAll("tags[]");

  try {
    const article = await Article.findByIdAndUpdate(
      id,
      { title, content, category, tags },
      { new: true }
    );
    if (!article) {
      return new Response(JSON.stringify({ message: "Article not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(article), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating article:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return new Response(JSON.stringify({ message: "Article not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: "Article deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
