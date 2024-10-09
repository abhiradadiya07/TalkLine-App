import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import prisma from "@/db/db.config";

// * Delete Comment

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  const findComment = await prisma.comment.findFirst({
    where: {
      id: Number(params.id),
      user_id: Number(session.user?.id),
    },
  });

  if (!findComment) {
    return NextResponse.json({ status: 400, message: "Bad Request" });
  }

    // Update post to decrease comment count by 1
    await prisma.post.update({
      where: {
        id: findComment.post_id,
      },
      data: {
        comment_count: {
          decrement: 1,
        },
      },
    });

    
  await prisma.comment.delete({
    where: {
      id: Number(params.id),
    },
  });


  return NextResponse.json({
    status: 200,
    message: "Comment deleted successfully!",
  });
}