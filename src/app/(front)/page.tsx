import Loading from "@/components/common/Loading";
import AddThread from "@/components/threads/AddThreads";
import Image from "next/image";
import { Suspense } from "react";

export default function FrontLayout() {
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
      <Suspense fallback={<Loading />}>
        <div className="mt-10">
          {/* {posts.map((item) => (
            <PostCard post={item} key={item.id} />
          ))} */}
        </div>
      </Suspense>
    </div>
  );
}
