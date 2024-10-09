import CommentCard from "@/components/common/CommentCard";
import DynamicNavBar from "@/components/common/DynamicNavBar";
import PostCard from "@/components/common/PostCard";
import { fetchSinglePost } from "@/lib/serverMethods";
import React from "react";

export default async function ShowPost({ params }: { params: { id: number } }) {
  const post = await fetchSinglePost(params.id);
  return (
    <div>
      <DynamicNavBar title="Show Post" />
      {post && (
        <div className="mt-7">
          <PostCard post={post} noRedirect={true} />
        </div>
      )}
      <div className="mt-5">
        <h1 className="font-bold text-lg mb-5">Comments</h1>

        {post?.Comment && post.Comment?.length > 0 ? (
          <div>
            {post.Comment.map((item: CommentType) => (
              <CommentCard comment={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div>No Comments Found</div>
        )}
      </div>
    </div>
  );
}
