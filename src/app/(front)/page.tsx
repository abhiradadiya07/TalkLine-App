import ThemeLogo from "@/components/base/ThemeLogo";
import PostCard from "@/components/common/PostCard";
import AddThread from "@/components/threads/AddThreads";
import { fetchPosts } from "@/lib/serverMethods";
export default async function Home() {
  const posts: Array<PostType> | [] = await fetchPosts();
  return (
    <div>
      <div className="hidden md:block">
       <div className="flex justify-center items-center">
        <ThemeLogo width={50} height={50} />
      </div>
      </div>
      <AddThread />
      <div className="mt-10">
        {posts.map((item) => (
          <PostCard post={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
