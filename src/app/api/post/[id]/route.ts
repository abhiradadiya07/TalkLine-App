import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// import { join } from "path";
// import { rmSync } from "fs";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import prisma from "@/db/db.config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  const { id } = params; // Ensure id is extracted from params
    
    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), {
            status: 400,
        });
    }
    
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        //   image: true,
        },
      },
      Comment: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            //   image: true,
            },
          },
        },
      },
    //   Likes: {
    //     where: {
    //       user_id: Number(session?.user?.id),
    //     },
    //   },
    },
  });

  return NextResponse.json({ status: 200, data: post });
}

// * Delete Post

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: number } }
// ) {
//   const session: CustomSession | null = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ status: 401, message: "Un-Authorized" });
//   }

//   const post = await prisma.post.findUnique({
//     where: {
//       id: Number(params.id),
//     },
//   });

//   if (post == null || post.user_id != Number(session.user?.id)) {
//     return NextResponse.json({ status: 401, message: "Un-Authorized" });
//   }

//   // * remove the file
//   const dir = join(process.cwd(), "public", "/uploads");
//   const path = dir + "/" + post?.image;
//   rmSync(path, { force: true });

//   await prisma.post.delete({
//     where: {
//       id: Number(params.id),
//     },
//   });

//   return NextResponse.json({
//     status: 200,
//     message: "Post deleted successfully!",
//   });
// }