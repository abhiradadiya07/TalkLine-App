import React from "react";
import UserAvatar from "./UserAvatar";
import { formateDate } from "@/lib/utils";
import DeleteComment from "../threads/DeleteComment";
import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";

export default async function CommentCard({
  comment,
}: {
  comment: CommentType;
}) {

  const session: CustomSession | null = await getServerSession(authOptions);
 
  return (
    <div className="mb-3">
      <div className="flex items-center space-x-4">
        <UserAvatar name={comment.user.name} image="" />
        <div className="bg-muted w-full rounded-lg p-4">
          <div className="flex justify-between items-start w-full">
            <p className="font-bold">{comment.user.name}</p>
            <div className="flex">
              <span className="mr-4 text-sm">
                {formateDate(comment.created_at)}
              </span>
              {session?.user?.id === comment.user_id.toString() ? (
                <DeleteComment comment={comment} />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="mt-4">{comment.content}</div>
        </div>
      </div>
    </div>
  );
}