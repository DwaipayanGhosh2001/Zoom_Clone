"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

import Link from "next/link";
function MobileNavbar() {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            width={32}
            height={32}
            alt="mobile nav button"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-dark-1 border-none text-white"
        >
          <Link href={"/"} className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="max-sm:size-12"
            />
            <p className="text-[26px] font-extrabold text-white"> Yoom</p>
          </Link>

          <div className="flex flex-1 flex-col gap-4 pt-14">
            {sidebarLinks.map((item) => {
              const isActive =
                pathname === item.route ||
                pathname.startsWith(`${item.route}/`);

              return (
                <SheetClose key={item.label} asChild>
                  <Link
                    href={item.route}
                    className={cn(
                      "flex gap-4 items-center p-4 rounded-lg justify-start",
                      {
                        "bg-blue-1": isActive,
                      }
                    )}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={24}
                      height={24}
                    />
                    <p className=" font-semibold">{item.label}</p>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNavbar;
