/* eslint-disable react/display-name */
import UserPostBar from "../common/UserPostBar";
import UserAvatar from "../common/UserAvatar";
import { useSession } from "next-auth/react";
import React, { memo } from "react";

interface CommentFormProps {
  post: PostType;
  content: string;
  setContent: (content: string) => void;
  errors: PostErrorType;
}

const CommentForm = memo(
  ({ post, content, setContent, errors }: CommentFormProps) => {
    const { data } = useSession();

    return (
      <>
        <div className="mt-5">
          <UserPostBar post={post} />
          <div className="mt-[-6px] ml-14">{post.content}</div>
        </div>
        <div className="mt-5 flex justify-start items-start">
          <UserAvatar
            name={data?.user?.name ?? "R"}
            image={data?.user?.image ?? ""}
          />
          <textarea
            className="w-full h-24 text-md p-2 bg-background outline-none resize-none rounded-lg placeholder:font-normal ml-2"
            placeholder="Type your comment..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          ></textarea>
        </div>
        <span className="text-red-400 font-bold ml-12">{errors.content}</span>
      </>
    );
  }
);

export default React.memo(CommentForm);
