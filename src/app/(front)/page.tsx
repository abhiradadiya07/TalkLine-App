import PostCard from "@/components/common/PostCard";
import AddThread from "@/components/threads/AddThreads";
import { fetchPosts } from "@/lib/serverMethods";
import Image from "next/image";
import { Suspense } from "react";

export default async function Home() {
  const posts: Array<PostType> | [] = await fetchPosts();
  return (
    <div>
      <div className="flex justify-center items-center">
        <Image
          src="/images/logo.svg"
          width={50}
          height={50}
          alt="Logo"
          className="hidden md:block" 
        />
      </div>
      <AddThread />
      <Suspense>
        <div className="mt-10">
          {posts.map((item) => (
            <PostCard post={item} key={item.id} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
