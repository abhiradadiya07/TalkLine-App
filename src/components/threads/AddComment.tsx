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
import { useState } from "react";
import UserAvatar from "../common/UserAvatar";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { formateDate } from "@/lib/utils";
import ImageViewer from "../common/ImageViewer";

const CommentsAdd = ({ post }: { post: PostType }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});
  const { data } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const submit = () => {
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
            variant: "default",
            className: "font-bold"
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
    <div className="mx-10">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <MessageCircle width={20} height={20} className="cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Comment</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="mt-5">
                <div className="flex">
                  <div>
                    <UserAvatar name={post.user.name} image="" />
                  </div>
                  <div className="flex ml-2 justify-between items-start w-full">
                    <p className="font-bold text-black dark:text-white text-base">
                      {post.user.name}
                    </p>
                    <div className="flex">
                      <span className="mr-4 text-sm text-white">
                        {formateDate(post.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-12 -mt-2">
                  {post?.image ? <ImageViewer image={post.image} /> : <></>}
                </div>
                <div className="ml-12 text-black dark:text-white">
                  {post.content}
                </div>
              </div>
              <div className="mt-5 flex justify-start items-start">
                <UserAvatar
                  name={data?.user?.name ?? "A"}
                  image={data?.user?.image ?? ""}
                />
                <textarea
                  className="w-full h-24 text-md p-2 bg-background resize-none border rounded-lg placeholder:font-normal ml-2 dark:text-white text-black"
                  name="content"
                  id="content"
                  placeholder="Type your comment here..."
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                ></textarea>
              </div>
              <span className="text-red-400 font-bold ml-12">
                {errors.content}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submit}>Add Comment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CommentsAdd;
