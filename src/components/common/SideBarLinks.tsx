import React from "react";

import Link from "next/link";
import { ToggleThemBtn } from "../common/ToggleThemBtn";
import { usePathname } from "next/navigation";
import { Bell, Home, Search, User2 } from "lucide-react";
import SignOutBtn from "./SignOutBtn";

export default function SideBarLinks() {
  const pathname = usePathname();
  const sidebarLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/explore", icon: Search, label: "Explore" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/profile", icon: User2, label: "Profile" },
  ];

  return (
    <ul className="mt-10">
      {sidebarLinks.map(({ href, icon: Icon, label }) => (
        <li key={href} className={href !== "/" ? "mt-6" : ""}>
          <Link
            href={href}
            className={`flex justify-start items-center hover:font-bold hover:bg-primary rounded-lg p-4 ${
              pathname === href ? "font-bold bg-primary" : ""
            }`}
          >
            <Icon className="text-2xl" height={25} width={25} />
            <h3 className="text-lg lg:text-xl ml-2">{label}</h3>
          </Link>
        </li>
      ))}

      <li className="flex items-center justify-between absolute bottom-10">
        <SignOutBtn />
        <ToggleThemBtn />
      </li>
    </ul>
  );
}
