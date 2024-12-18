/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DynamicNavBar from "@/components/common/DynamicNavBar";
import UserProfileAvatar from "@/components/common/UserProfileAvatar";
import PostCard from "@/components/common/PostCard";
import CommentCard from "@/components/common/CommentCard";
import { fetchUser } from "@/lib/serverMethods";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Explore Users",
  description: "Find your friend and chat with theme.",
  openGraph: {
    title: "Search your Friends"
  }
};

export default async function ShowUser({ params }: { params: { id: number } }) {
  const user: ShowUsers | null = await fetchUser(params.id);
  console.log(user);
  return (
    <div>
      <DynamicNavBar title="Profile" />
      <div className="flex items-center space-x-4 mt-5">
        <div>
          <UserProfileAvatar name={user?.name ?? "A"} />
        </div>
        <div>
          <h1 className="text-2xl font-bold ">{user?.name}</h1>
          <p className="text-lg dark:text-orange-400 text-orange-700 font-bold ">
            @{user?.username}
          </p>
          <h1 className="text-xl">{user?.email}</h1>
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
              {user?.Post &&
                user.Post.length > 0 &&
                user.Post.map((item) => (
                  <PostCard post={item} key={item.id} isAuthPost={false} />
                ))}
              {user?.Post && user.Post.length < 1 && (
                <h1 className="text-center mt-5">No Post found</h1>
              )}
            </div>
          </TabsContent>
          <TabsContent value="comment">
            <div className="mt-5">
              {user?.Comment &&
                user.Comment.length > 0 &&
                user.Comment.map((item) => (
                  <CommentCard comment={item} key={item.id} />
                ))}

              {user?.Comment && user.Comment.length < 1 && (
                <h1 className="text-center mt-5">No Comment found</h1>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
