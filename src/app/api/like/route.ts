import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../auth/[...nextauth]/option";
import prisma from "@/db/db.config";

export async function POST(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }
  const payload: LikeType = await request.json();

  if (!payload.post_id || !payload.toUser_id) {
    return NextResponse.json({
      status: 400,
      message: "Bad request. Please pass post id",
    });
  }

  // * Add Notification
  if (payload.status == "1") {
    await prisma.notification.create({
      data: {
        user_id: Number(session.user?.id),
        toUser_id: Number(payload.toUser_id),
        content: "Liked your post.",
      },
    });

    // * In crease the post like counter
    await prisma.post.update({
      where: {
        id: Number(payload.post_id),
      },
      data: {
        likes_count: {
          increment: 1,
        },
      },
    });

    // * Add Entry in like table
    await prisma.likes.create({
      data: {
        user_id: Number(session?.user?.id),
        post_id: Number(payload.post_id),
      },
    });
  } else if (payload.status == "0") {
    // * In crease the post like counter
    await prisma.post.update({
      where: {
        id: Number(payload.post_id),
      },
      data: {
        likes_count: {
          decrement: 1,
        },
      },
    });

    // * delete in like table
    await prisma.likes.deleteMany({
      where: {
        post_id: Number(payload.post_id),
        user_id: Number(session?.user?.id),
      },
    });
  }

  return NextResponse.json({
    status: 200,
    message:
      payload.status == "1"
        ? "Post Liked successfully!"
        : "Post Disliked successfully!",
  });
}   