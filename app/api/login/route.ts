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
    return Response.json({ message: "Invalid credentials" });
  }
  
  const isPasswordValid = await compare(password, user.password);
  
  if (!isPasswordValid) {
    return Response.json({ message: "Invalid credentials" });
  }
  
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  
  Response.json({ token });
} catch (error) {
  
  Response.json({ message: "Method not allowed" });
}

  
  
}
