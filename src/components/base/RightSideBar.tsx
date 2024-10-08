// import { Suspense } from "react";
// import UserListCard from "../common/UserListCard";
// import { fetchUsers } from "@/lib/serverMethods";

import UserListCard from "../common/UserListCard";

export default async function RightSidebar() {
  // const users: Array<User> | [] = await fetchUsers();
  return (
    <div className="h-screen border-l-2 w-full lg:w-1/4 lg:pt-5 lg:px-2 xl:p-5 hidden lg:block">
      <div className="">
        <h1 className="text-2xl font-bold">Suggestion for you</h1>
      </div>
      <div className="mt-5">
        {/* {users.map((item) => ( */}
        <UserListCard />
        {/* <UserListCard user={item} key={item.id} /> */}
        {/* ))} */}
      </div>
    </div>
  );
}
