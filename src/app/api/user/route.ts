import { NextResponse } from "next/server";
import { authOptions, CustomSession } from "../auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import prisma from "@/db/db.config";

export async function GET() {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ status: 401, message: "Un-Authorized" });
  }

  const users = await prisma.user.findMany({
    where: {
      NOT: {
        id: Number(session.user?.id),
      },
    },
    select: {
      id: true,
      name: true,
      username: true,
    //   image: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json({ status: 200, data: users });
}