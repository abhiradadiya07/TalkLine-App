import { ThemeProvider } from "@/components/theme-provider";
import CustomProvider from "../CustomProvider";
import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Page",
  description: "The Threads app Auth pages.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </CustomProvider>
  );
}
