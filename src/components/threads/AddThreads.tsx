/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Image } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { useState, useRef } from "react";
import { Button } from "../ui/button";
import ImagePreviewCard from "../common/ImagePreviewCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function AddThread() {
  const { toast } = useToast();
  const { data } = useSession();
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<PostErrorType>({});

  const handleIconClick = () => {
    imageRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("The image is", selectedFile);
      setImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };
  const removePreview = () => {
    setImage(null);
    setPreviewUrl(undefined);
  };

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    axios
      .post("/api/post", formData)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 400) {
          setErrors(response.errors);
        } else if (response.status == 200) {
          setContent("");
          setImage(null);
          setPreviewUrl(undefined);
          setErrors({});
          toast({
            title: "Success",
            description: response.message,
            variant: "default",
            className: "font-bold"
          });
          router.refresh();
        } else if (response.status == 500) {
          toast({
            title: "Error",
            description: response.message,
            variant: "destructive",
            className: "font-bold"
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  return (
    <div className="mt-5 border-b pb-3">
      {previewUrl ? (
        <div className="mb-5">
          <ImagePreviewCard image={previewUrl} callback={removePreview} />
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-start items-start">
        <UserAvatar name={data?.user?.name ?? "A"} image="" />
        <textarea
          className="w-full h-24 text-md p-2 bg-muted outline-none  resize-none rounded-lg placeholder:font-normal ml-2"
          placeholder="Type something great...."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <span className="text-red-400 font-bold ml-12">{errors?.content}</span>

      <div className="ml-12  flex justify-between items-center">
        <input
          type="file"
          ref={imageRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <Image
          onClick={handleIconClick}
          height={20}
          width={20}
          className="cursor-pointer"
        />
        <Button
          disabled={content.length <= 3 || loading ? true : false}
          onClick={submit}
        >
          {loading ? "Processing.." : "Post"}
        </Button>
      </div>
    </div>
  );
}
