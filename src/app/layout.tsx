import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yoom Calls",
  description: "Video Calling Web Application",
  icons:{
    icon:"/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
        layout:{
          logoImageUrl:"/icons/yoom-logo.svg",
          socialButtonsVariant:"iconButton"
        },
        variables:{
          colorPrimary:"#0E78F9",
          colorBackground:"#1C1F2E",
          colorText:"#fff",
          colorInputText:"#fff",
          colorInputBackground:"#252a41"
        }
      }}>
        <body className={`${inter.className} bg-dark-2`}>{children} <Toaster/></body>
        {/* Here bg-dark-2 is a custom tailwind class created by going to the config file and adding the dark object with colors 
      under the color section. */}
      </ClerkProvider>
    </html>
  );
}
