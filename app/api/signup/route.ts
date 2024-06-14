import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { hash } from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const MONGOURL = process.env.MONGOURL;

if (!MONGOURL) {
  throw new Error("Missing MONGOURL");
}

const User = mongoose.models.User || mongoose.model("User", userSchema);

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGOURL);
  }
};

export async function POST(request: Request) {
  await connectToDatabase();
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof password !== "string") {
    return ;
  }

  try {
    const hashedPassword = await hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ email, password })
  } catch (error) {
    return NextResponse.json({ message: "Method not allowed" });
  }
}
