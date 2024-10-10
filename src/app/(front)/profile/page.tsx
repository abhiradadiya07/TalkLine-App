/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import React from "react";

import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DynamicNavBar from "@/components/common/DynamicNavBar";
import UserProfileAvatar from "@/components/common/UserProfileAvatar";
import {
  authOptions,
  CustomSession
} from "@/app/api/auth/[...nextauth]/option";
import { fetchUserComments, fetchUserPosts } from "@/lib/serverMethods";
import PostCard from "@/components/common/PostCard";
import CommentCard from "@/components/common/CommentCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile.",
  openGraph: {
    title: "Explore your Profile"
  }
};

export default async function Profile() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts: Array<PostType> | [] = await fetchUserPosts();
  const comments: Array<CommentType> | [] = await fetchUserComments();
  return (
    <div>
      <DynamicNavBar title="Profile" />
      <div className="flex items-center space-x-4 mt-5">
        <div>
          <UserProfileAvatar
            name={session?.user?.name!}
            image={session?.user?.image!}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold ">{session?.user?.name}</h1>
          <p className="text-lg dark:text-orange-400 text-orange-700 font-bold">@{session?.user?.username}</p>
          <h1 className="text-xl">{session?.user?.email}</h1>
        </div>
      </div>

      <div className="mt-10 ">
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="post" className="w-full">
              Posts
            </TabsTrigger>
            <TabsTrigger value="comment" className="w-full">
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <div className="mt-5">
              {posts &&
                posts.length > 0 &&
                posts.map((item) => (
                  <PostCard post={item} key={item.id} isAuthPost={true} />
                ))}
              {posts && posts.length < 1 && (
                <h1 className="text-center mt-5">No Post found</h1>
              )}
            </div>
          </TabsContent>
          <TabsContent value="comment">
            <div className="mt-5">
              {comments &&
                comments.length > 0 &&
                comments.map((item) => (
                  <CommentCard comment={item} key={item.id} />
                ))}

              {comments && comments.length < 1 && (
                <h1 className="text-center mt-5">No Comment found</h1>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
