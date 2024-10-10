import UserPostBar from "./UserPostBar";
import ImageViewer from "./ImageViewer";
import AddComment from "../threads/AddComment";
import Link from "next/link";
import React from "react";
import SharePost from "./SharePost";
import Env from "@/config/env";
import LikePost from "../threads/LikePost";
export default function PostCard({
  post,
  isAuthPost,
  noRedirect
}: {
  post: PostType;
  noRedirect?: boolean;
  isAuthPost?: boolean;
}) {
  return (
    <div className="pb-3 mb-3 border-b">
      <UserPostBar post={post} isAuthPost={isAuthPost} />
      <div className="ml-12 mt-[-10px]">
        <Link href={noRedirect == true ? "#" : `/post/${post.id}`}>
          {post.content}
        </Link>
        {post?.image ? <ImageViewer image={post.image} /> : <></>}
        <div className="mt-5 flex items-center space-x-4">
          <LikePost post={post} />
          <AddComment post={post} />
          <SharePost url={`${Env.APP_URL}/post/${post.id}`} />
        </div>
        <div className="mt-2">
          <span className="font-semibold">{post.likes_count} Likes</span>
          <span className="font-semibold ml-3">{post.comment_count} Replies</span>
        </div>
      </div>
    </div>
  );
}
