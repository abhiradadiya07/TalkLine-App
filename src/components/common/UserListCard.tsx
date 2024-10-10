import React from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UserListCard({ user }: { user: User }) {
  return (
    <div className="w-full border-b-2 p-3 mb-3">
      <div className="flex">
        <UserAvatar name={user.name} image={user.image} />
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col -mt-1">
            <strong className="text-md font-bold ml-2">{user.name}</strong>
            <span className="ml-2 text-xs">@{user.username}</span>
          </div>
          <Link href={`/user/${user.id}`}>
            <Button size="sm">view</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
