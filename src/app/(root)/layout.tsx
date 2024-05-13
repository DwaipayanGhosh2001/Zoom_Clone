//This file will hold the layout for the pages inside the root folder.
import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Yoom Calls",
  description: "Video Calling Web Application",
  icons:{
    icon:"/icons/logo.svg"
  }
};
function RootLayout({ children }: { children: ReactNode }) {
  //Here using TS the children type is defined as ReactNode.
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
}

export default RootLayout;
