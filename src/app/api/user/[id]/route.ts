import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../../auth/[...nextauth]/option";
import prisma from "@/db/db.config";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    NextResponse.json({ status: "401", message: "un-authorized" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      name: true,
      email: true,
      username: true,

      Post: {
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
              user_id: Number(params.id),
            },
          },
        },
      },

      Comment: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      },
      
    },
  });

  return NextResponse.json({ status: 200, data: user });
}
