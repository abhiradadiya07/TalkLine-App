/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { MessageCircle } from "lucide-react";
import UserPostBar from "../common/UserPostBar";
import UserAvatar from "../common/UserAvatar";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AddComment = ({ post }: { post: PostType }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});
  const { data } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const submit = () => {
    console.log("post comment");

    setLoading(true);
    axios
      .post("/api/comment", {
        content: content,
        post_id: post.id.toString(),
        toUser_id: post.user_id.toString()
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        if (response.status === 200) {
          setContent("");
          setErrors({});

          toast({
            title: "Success",
            description: response.message,
            className: "bg-green-500"
          });
        } else if (response.status === 400) {
          setErrors(response.errors);
        }
        router.refresh();
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error: ", err);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <MessageCircle width={20} height={20} className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Comment</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mt-5">
              <UserPostBar post={post} />
              <div className="mt-[-6px] ml-14">{post.content}</div>
            </div>
            <div className="mt-5 flex justify-start items-start">
              <UserAvatar
                name={data?.user?.name ?? "R"}
                image={data?.user?.image ?? ""}
              />
              <form>
              <textarea
                className="w-full h-24 text-md p-2 bg-background outline-none resize-none rounded-lg placeholder:font-normal ml-2"
                placeholder="Type your comment..."
                onChange={(e) => setContent(e.target.value)}
                value={content}
              ></textarea>
              </form>
            </div>
            <span className="text-red-400 font-bold ml-12">
              {errors.content}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={submit}>Comment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AddComment;
