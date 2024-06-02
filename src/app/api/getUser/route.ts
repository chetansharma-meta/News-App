import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/User";

export const POST = async (req: NextRequest) => {
    await dbConnect();
    try {
        const formData = await req.formData();
        const userId = formData.get('userId');
        console.log("API LOG: ",{ userId });
        const user = await User.findById(userId).populate('articles');
        if (!user) {
          return new Response(JSON.stringify({ message: 'User not found' }), {
            status: 404,
          });
        }
    
        return new Response(JSON.stringify(user), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
          status: 500,
        });
      }
}