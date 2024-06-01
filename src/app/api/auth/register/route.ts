import  dbConnect  from "@/lib/dbConnect";

import bcrypt from "bcrypt";
import User from "@/model/User";

export const POST = async (req: Request) => {
  await dbConnect();
  try {
    const formData = await req.formData();
    console.log("DATA",formData);
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const existingUser = await User.findOne({
      $or: [
        {email}
      ]
    });

    if (existingUser) {
      return Response.json({
        status: 400,
        body: {
          success: false,
          message: "Username already exists",
        },
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      verifyCode,
      verfiyCodeExpiry: expiryDate,
    });
    await user.save();
    return Response.json(
      {
        data: user,
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user", error);
    return Response.json({
      status: 500,
      body: {
        success: false,
        message: "Error creating user",
      },
    });
  }
};
