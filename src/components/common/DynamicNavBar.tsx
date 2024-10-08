"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

export default function DynamicNavBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex space-x-10">
        <MoveLeft onClick={() => router.back()} className="cursor-pointer" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </div>
  );
}
