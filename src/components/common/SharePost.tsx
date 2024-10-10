"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Copy, SendHorizonal } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LineShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon
} from "next-share";
import { useToast } from "@/hooks/use-toast";

export default function SharePost({ url }: { url: string }) {
  const { toast } = useToast();
  const copyUrl = async () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Url Copied successfully!",
      variant: "default",
      className: "font-bold"
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SendHorizonal width={19} height={19} className="ml-3 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>
            <div className="flex rounded-md border justify-between p-5 mt-5">
              <strong> {url}</strong>
              <Copy onClick={copyUrl} className="cursor-pointer" />
            </div>
            <div className="flex items-center space-x-5 mt-5">
              <FacebookShareButton
                url={url}
                quote={"TalkLine Post."}
                hashtag={"#talkline"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton url={url}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <LineShareButton url={url}>
                <LinkedinIcon size={32} round />
              </LineShareButton>
              <EmailShareButton url={url}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
