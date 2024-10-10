"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Link from "next/link";
import SideBarLinks from "../common/SideBarLinks";
import { Menu, User2 } from "lucide-react";
import ThemeLogo from "./ThemeLogo";

export default function MobileNavBar() {
  return (
    <nav className="md:hidden flex justify-between items-center">
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger>
            <Menu height={30} width={30} className="font-bold" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-start items-center">
                  <ThemeLogo height={50} width={50} />
                  <h1 className="font-bold text-xl ml-2">Threads</h1>
                </div>
              </SheetTitle>
              <SheetDescription>
                <SideBarLinks />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <ThemeLogo width={30} height={30} />
      <Link href="/profile">
        <User2 height={25} width={25} />
      </Link>
    </nav>
  );
}
