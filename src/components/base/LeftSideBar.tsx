"use client";
import React from "react";
import Image from "next/image";
import SideBarLinks from "../common/SideBarLinks";
import Link from "next/link";

export default function LeftSidebar() {
  return (
    <div className="h-screen border-r-2 md:w-1/4 lg:p-10 md:pt-3 md:p-5 hidden md:block">
      <div className="flex justify-start items-center">
        <Link href={"/"}>
          <Image src="/images/logo.svg" width={50} height={50} alt="logo" />
        </Link>
        <h1 className="font-bold text-2xl ml-2">Threads</h1>
      </div>
      <SideBarLinks />
    </div>
  );
}
