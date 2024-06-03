import Reaction from "@/model/Reaction";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
){
    await dbConnect();
    const { id } = params;
    const formData = await req.formData();
    const user = formData.get("user");

    try {
        const reaction = await Reaction.findOne(
            { user: user, article: id}
        );
        if (reaction) {
            console.log("Reaction is found");
        } 
        return new Response(JSON.stringify(reaction), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching reaction:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
        });
    }}