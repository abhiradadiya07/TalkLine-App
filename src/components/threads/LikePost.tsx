"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const LikePost = ({ post }: { post: PostType }) => {
  const [isLiked, setIsLiked] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const likeDislike = (status: string) => {
    setIsLiked(status);
    axios
      .post("/api/like", {
        post_id: post.id,
        toUser_id: post.user_id,
        status: status,
      })
      .then((res) => {
        const response = res.data;
        if (response.status === 200) {
          toast({
            title: "Success!!",
            description: response.message,
            className: "bg-green-500",
          });
          router.refresh();
        } else if (response.status === 400) {
          toast({
            title: "Failure!!",
            description: response.message,
            className: "bg-red-500",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        console.log(err);
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
          className="cursor-pointer "
          onClick={() => likeDislike("0")}
        />
      ) : (
        <Heart
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => likeDislike("1")}
        />
      )}
    </div>
  );
};
export default LikePost;
