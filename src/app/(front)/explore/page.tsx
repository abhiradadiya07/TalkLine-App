/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import UserListCard from "@/components/common/UserListCard";
import { Metadata } from "next";
import DynamicNavBar from "@/components/common/DynamicNavBar";
import ExploreSearchBar from "@/components/explore/ExploreSearchBar";
import { searchUser } from "@/lib/serverMethods";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search users here and show there profile...",
};

export default async function Explore({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const users: Array<User> | [] = await searchUser(searchParams?.query!);
  return (
    <div>
      <DynamicNavBar title="Explore" />
      <ExploreSearchBar />

      <div className="mt-5">
        {users?.length > 0 &&
          users.map((item) => <UserListCard user={item} key={item.id} />)}
        {users?.length < 1 && searchParams?.query?.length! > 1 && (
          <div className="text-center">
            <h1 className="font-bold">No User found</h1>
          </div>
        )}
      </div>
    </div>
  );
}