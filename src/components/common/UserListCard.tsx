import React from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
// import Link from "next/link";

// export default function UserListCard({ user }: { user: User }) {
export default function UserListCard() {
  return (
    <div className="w-full shadow-sm  p-4 rounded-md mb-3">
      <div className="flex">
        {/* <UserAvatar name={ranjan} image={user.image} /> */}
        <UserAvatar name="tushar" image="" />
        {/* <UserAvatar name={ranjan} image={user.image} /> */}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <strong className="text-md font-bold ml-2">abhishek</strong>
            {/* <strong className="text-md font-bold ml-2">{user.name}</strong> */}
            {/* <span className="ml-2 font-light text-xs">@{user.username}</span> */}
            <span className="ml-2 font-light text-xs">@abhi`</span>
          </div>
          {/* <Link href={`/user/${user.id}`}> */}
          <Button size="sm">view</Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
