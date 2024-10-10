import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function UserAvatar({
  name,
  image
}: {
  name: string;
  image?: string;
}) {
  return (
    <Avatar>
      <AvatarImage src={image} className="object-cover" />
      <AvatarFallback className="font-semibold">
        {name[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
