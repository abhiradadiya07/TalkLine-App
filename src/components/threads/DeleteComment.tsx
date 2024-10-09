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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const DeleteComment = ({ comment }: { comment: CommentType }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const deleteComment = () => {
    setLoading(true);
    axios
      .delete(`/api/comment/${comment.id}`)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status === 200) {
          toast({
            title: "Deleted",
            description: response.message,
            className: "bg-green-500",
          });
          router.refresh();
        } else if (response.status === 400) {
          toast({
            title: "Error",
            description: response.message,
            className: "bg-red-500",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error: ", err);
      });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2
          height={22}
          width={22}
          className="cursor-pointer text-red-500"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment and remove your comment from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteComment} disabled={loading}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteComment;
