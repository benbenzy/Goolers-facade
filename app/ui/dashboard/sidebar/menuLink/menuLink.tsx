"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface props {
  item: { title: string; path: string; icon: any };
}

function MenuLink({ item }: props) {
  const pathname = usePathname();
  //console.log("pathname", pathname);
  return (
    <Link
      href={item.path}
      className={`flex flex-row items-center p-2 gap-3 hover:bg-slate-600 hover:rounded-md ${
        pathname === item.path && "bg-slate-600 rounded-md ml-3"
      }`}>
      {item.icon}
      {item.title}
    </Link>
  );
}

export default MenuLink;
