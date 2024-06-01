"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
// import government from "@/public/government.png";
// import sports from "@/public/sports.png";
// import tech from "@/public/tech.png";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isloggedin, setIsloggedin] = useState(false);
  return (
    <div
      className={cn("fixed top-2 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <Link href={"/news"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="News"
          ></MenuItem>
        </Link>
        {/* <MenuItem setActive={setActive} active={active} item="Explore">
          <div className="flex flex-col space-y-4 px-5 text-sm">
            <HoveredLink href="/politics">Politics</HoveredLink>
            <HoveredLink href="/sports">Sports</HoveredLink>
            <HoveredLink href="/tech">Tech</HoveredLink>
          </div>
        </MenuItem> */}
        <MenuItem setActive={setActive} active={active} item="Explore">
          <div className="text-sm grid grid-cols-3 gap-10 p-4">
            <ProductItem
              title="Politcs"
              href="https://algochurn.com"
              src="/government.png"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Sports"
              href="https://tailwindmasterkit.com"
              src="/running.png"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Technology"
              href="https://gomoonbeam.com"
              src="/technology.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
          </div>
        </MenuItem> 
        <Link href={"/search"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Search"
          ></MenuItem>
        </Link>
        {!session ? (
          <>
            <Link href={"/login"}>
              <MenuItem
                setActive={setActive}
                active={active}
                item="Login"
              ></MenuItem>
            </Link>
          </>
        ) : (
          <>
            <Link href={"/upload"}>
              <MenuItem
                setActive={setActive}
                active={active}
                item="Upload"
              ></MenuItem>
            </Link>
            <Link href="" onClick={() => signOut()}>
              <MenuItem
                setActive={setActive}
                active={active}
                item="Logout"
              ></MenuItem>
            </Link>
          </>
        )}
      </Menu>
    </div>
  );
}

export default Navbar;
