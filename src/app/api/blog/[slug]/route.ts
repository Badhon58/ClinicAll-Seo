// import { NextResponse } from "next/server";
// import { connectDb } from "@/lib/config/db";
// import BlogModel from "@/lib/models/blog-model";
// const LoadDB = async () => {
//   await connectDb();
// };
// LoadDB();
// // GET /api/blogs/[slug]
// export async function GET(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const { slug } = params;
//     const blog = await BlogModel.findOne({ slug });

//     if (!blog) {
//       return NextResponse.json({ message: "Blog not found" }, { status: 404 });
//     }

//     return NextResponse.json(blog, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error fetching blog" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const { slug } = params;
//     const blog = await BlogModel.findOneAndDelete({ slug });
//     if (!blog) {
//       return NextResponse.json(
//         { message: "Blog not found", success: false },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       { message: "Blog deleted successfully", blog, success: true },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error fetching blog", success: false },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/config/db";
import BlogModel from "@/lib/models/blog-model";

const LoadDB = async () => {
  await connectDb();
};
LoadDB();

// GET /api/blogs/[slug]
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const blog = await BlogModel.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching blog" },
      { status: 500 }
    );
  }
}
// DELETE /api/blogs/[slug]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const blog = await BlogModel.findOneAndDelete({ slug });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog deleted successfully", blog, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting blog", success: false },
      { status: 500 }
    );
  }
}
