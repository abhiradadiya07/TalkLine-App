// components/ThemeLogo.tsx
"use client"; // Mark this component as client-side

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ThemeLogo({height,width}:{height:number,width:number}) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on the client, set the mounted state to true
  useEffect(() => {
    setMounted(true);
  }, []);

  // While rendering on the server or before mounting on the client, render nothing
  if (!mounted) {
    return null;
  }

  return (
    <Image
      src={theme === "dark" || resolvedTheme === "dark" ? "/images/dark.svg" : "/images/logo.svg"}
      width={width}
      height={height}
      alt="Logo"
    />
  );
}
