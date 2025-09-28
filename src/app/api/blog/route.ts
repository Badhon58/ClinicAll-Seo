import { connectDb } from "@/lib/config/db";
import BlogModel from "@/lib/models/blog-model";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await connectDb();
};
LoadDB();
export async function GET(request: Request) {
  try {
    const data = await BlogModel.find()
      .sort({
        createdAt: -1,
      })
      .exec();

    const listA: any[] = [];
    const listB: any[] = [];

    // Customize this categorization logic based on your needs
    data.forEach((blog) => {
      if (blog.type === "A") {
        listA.push(blog);
      } else {
        listB.push(blog);
      }
    });

    // Apply the new pattern
    const result: any[] = [];
    let indexA = 0;
    let indexB = 0;

    // Start with A if available
    if (indexA < listA.length) {
      result.push(listA[indexA++]);
    }

    let turn = 0; // 0 for B, 1 for A

    while (result.length < data.length) {
      for (let i = 0; i < 2 && result.length < data.length; i++) {
        if (turn === 0) {
          if (indexB < listB.length) {
            result.push(listB[indexB++]);
          } else if (indexA < listA.length) {
            // Fallback to A if B is exhausted
            result.push(listA[indexA++]);
          }
        } else {
          if (indexA < listA.length) {
            result.push(listA[indexA++]);
          } else if (indexB < listB.length) {
            // Fallback to B if A is exhausted
            result.push(listB[indexB++]);
          }
        }
      }
      turn = 1 - turn; // Toggle between 0 and 1
    }
    return NextResponse.json({
      success: true,
      message: "Successfully fetch all Blogs",
      result,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request", error },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBlog = await BlogModel.create(body);

    return NextResponse.json({
      success: true,
      message: "successfully created a new Blog",
      newBlog,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request", error },
      { status: 400 }
    );
  }
}
