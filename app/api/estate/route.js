import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "../../../lib/cloudinary"; // Correct relative path
import Estate from "../../../models/estateModel";
import { Readable } from "stream";

const MONGOURL = process.env.MONGOURL;

if (!MONGOURL) {
  throw new Error("Missing MONGOURL");
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGOURL);
  }
};

export async function POST(request) {
  await connectToDatabase();

  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description")  ;
  const imageFile = formData.get("image") ;

  if (!title || !description || !imageFile) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());

  const uploadStream = () =>
    new Promise<CloudinaryUploadResult>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "estates" },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      Readable.from(buffer).pipe(stream);
    });

  try {
    const result = await uploadStream();

    if (result.secure_url) {
      const newEstate = new Estate({
        title,
        description,
        image: result.secure_url,
      });

      await newEstate.save();

      return NextResponse.json(newEstate, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "Upload failed: No secure URL" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}


export async function GET() {
  await connectToDatabase();

  try {
    const estates = await Estate.find();
    return NextResponse.json(estates, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch estates" },
      { status: 500 }
    );
  }
}
