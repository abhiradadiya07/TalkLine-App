import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { getServerSession } from "next-auth";
import { join } from "path";
import { writeFile } from "fs/promises";
import { authOptions, CustomSession } from "../auth/[...nextauth]/option";
import { postSchema } from "@/validations/postSchema";
import { CustomErrorReporter } from "@/validations/CustomErrorReporter";
import { imagevalidator } from "@/validations/imageValidator";
import { getRandomNumber } from "@/lib/utils";
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
      // Likes: {
      //   take: 1,
      //   where: {
      //     user_id: Number(session?.user?.id),
      //   },
      // },
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

export async function POST(request: NextRequest) {
  try {
      
      const session: CustomSession | null = await getServerSession(authOptions);
      if (!session) {
          return NextResponse.json({ status: 401, message: "Un-Authorized" });
        }
        const formData = await request.formData();
    const data = {
      content: formData.get("content"),
      image: "",
    };
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const payload = await validator.validate(data);

    const image = formData.get("image") as Blob | null;
    // * IF image exist
    if (image) {
      const isImageNotValid = imagevalidator(image?.name, image?.size || 0);
      if (isImageNotValid) {
        return NextResponse.json({
          status: 400,
          errors: {
            content: isImageNotValid,
          },
        });
      }

      // * Upload image if all good
      try {
        const buffer = Buffer.from(await image!.arrayBuffer());
        const uploadDir = join(process.cwd(), "public", "/uploads");
        const uniqueName = Date.now() + "_" + getRandomNumber(1, 999999);
        const imgExt = image?.name.split(".");
        const filename = uniqueName + "." + imgExt?.[1];
        await writeFile(`${uploadDir}/${filename}`, buffer);
        data.image = filename;
      } catch (error) {
        return NextResponse.json({
          status: 500,
          message: "Something went wrong.Please try again later.",
        });
      }
    }

    try {
      await prisma.post.create({
        data: {
          content: payload.content,
          user_id: Number(session.user?.id),
          image: data.image ?? null,
        },
      }); 

      return NextResponse.json({
        status: 200,
        message: "Post created successfully!",
      });
    } catch (dbError) {
      console.error("Error while creating post in DB:", dbError);
      return NextResponse.json({
        status: 500,
        message: "Error creating post in the database.",
      });
    }

  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}