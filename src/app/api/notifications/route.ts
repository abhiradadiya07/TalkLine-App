import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../auth/[...nextauth]/option";
import prisma from "@/db/db.config";

export async function GET() {
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: 401, message: "Un Authorized." });
  }

  const notifications = await prisma.notification.findMany({
    where: {
      toUser_id: Number(session?.user?.id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json({ status: 200, data: notifications });
}