import Article from "@/model/Article";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";

export const GET = async (req:NextRequest) => {
    await dbConnect();
    try {
        const articles = await Article.find().select('title content category tags author').populate('author', 'name email');        return new Response(JSON.stringify({ articles }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
        });
    }
}