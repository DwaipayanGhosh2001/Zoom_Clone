import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNavbar from "./mobilenavbar";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

function Navbar() {
  return (
    <section className="flex-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 ">
      {/* Here flex-center is a custom tailwind css class created in layer utilities Check it in global.css */}
      <Link href={"/"} className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="max-sm:size-12"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          {" "}
          Yoom
        </p>
      </Link>

      <div className="flex ms-auto gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNavbar />
      </div>
    </section>
  );
}

export default Navbar;
