"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const LikePost = ({ post }: { post: PostType }) => {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(post.Likes.length > 0 ? "1" : "");
  const router = useRouter();
  const { toast } = useToast();
  const likeDislike = (status: string) => {
    if (loading || isLiked === status) return; // Prevent further requests while loading
    setLoading(true); // Start loading
    axios
      .post("/api/like", {
        post_id: post.id,
        toUser_id: post.user_id,
        status: status,
      })
      .then((res) => {
        const response = res.data;
        if (response.status === 200) {
          setIsLiked(status);
          toast({
            title: "Success!!",
            description: response.message,
            variant: "default",
            className: "font-bold",
          });
          router.refresh();
        } else if (response.status === 400) {
          toast({
            title: "Failure!!",
            description: response.message,
            variant: "destructive",
            className: "font-bold",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Stop loading after request is finished
        router.refresh();
      });
  };

  return (
    <div>
      {post.Likes.length > 0 || isLiked == "1" ? (
        <Heart
          width={20}
          height={20}
          fill="red"
          strokeWidth={0}
          className={`cursor-pointer ${loading ? "opacity-50" : ""}`}
          onClick={() => !loading && likeDislike("0")}
        />
      ) : (
        <Heart
          width={20}
          height={20}
          className={`cursor-pointer ${loading ? "opacity-50" : ""}`}
          onClick={() => !loading && likeDislike("1")}
        />
      )}
    </div>
  );
};
export default LikePost;
