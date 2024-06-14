import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const MONGOURL = process.env.MONGOURL;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

if (!MONGOURL) {
  throw new Error("Missing MONGOURL");
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

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

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
}
