import { NextResponse } from "next/server";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import prisma from "@/db/db.config";

export async function GET() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
      Likes: {
        where: {
          user_id: Number(session?.user?.id),
        },
      },
    },
    where: {
      user_id: Number(session?.user?.id),
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json({
    status: 200,
    data: posts,
  });
}