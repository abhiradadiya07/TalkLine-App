import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { genSaltSync, hashSync } from "bcryptjs";
import { CustomErrorReporter } from "@/validations/CustomErrorReporter";
import { regSchema } from "@/validations/authSchema";
import prisma from "@/db/db.config";
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(regSchema);
    const payload = await validator.validate(data);

    const isEmailExist = await prisma.user.findUnique({
      where: { email: payload.email },select: {
        id: true,
      },
    });

    if (isEmailExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Email already exists. Please use a different email.",
        },
      });
    }
    const isUsernameExist = await prisma.user.findUnique({
      where: { username: payload.username },
      select: {
        id: true,
      },
    });

    if (isUsernameExist) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Username already exists. Please use a different username.",
        },
      });
    }

    const salt = genSaltSync(10);
    payload.password = hashSync(payload.password, salt);

    // insert in db
    await prisma.user.create({ data: payload });
    return NextResponse.json({ status: 200, message: "Account created!!" });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status: 400, errors: error.messages });
    }
  }
}
