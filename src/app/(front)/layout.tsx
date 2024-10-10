import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CustomProvider from "../CustomProvider";
import BaseComponent from "@/components/base/BaseComponent";

export const metadata: Metadata = {
  title: "Home",
  description: "A social media platform.",
};

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange 
    >
      <CustomProvider>
        <BaseComponent>{children}</BaseComponent>
      </CustomProvider>
    </ThemeProvider>
  );
}
