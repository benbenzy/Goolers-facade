'use client';
import { useAuth } from '@/app/context/authContext';
import { supabaseLogout } from '@/utils/supabase/actions';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';
import { MdNotifications, MdOutlineChat, MdSearch } from 'react-icons/md';

function Navbar() {
  const auth = useAuth();
  const pathname = usePathname();
  return (
    <div className=" bg-slate-800 rounded-md  items-center flex flex-row justify-between p-5">
      <div className=" text-slate-300 capitalize font-mono">
        {pathname.split('/').pop()}
      </div>
      <div className="flex flex-row gap-5 items-center">
        <div className="flex flex-row gap-2 items-center p-2 rounded-md bg-slate-700">
          <MdSearch size={20} />{' '}
          <input
            type="text"
            placeholder="search"
            className=" border-none bg-transparent text-slate-950"
          />
        </div>
        <div className="flex flex-row gap-1">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <div>
            {auth?.currentUser ? (
              <button
                onClick={() => supabaseLogout()}
                className="bg-gray-600 cursor-pointer text-slate-200 rounded-xg w-20 align-middle items-center justify-center flex hover:bg-gray-400"
              >
                logout
              </button>
            ) : (
              <Link
                href={'/signin'}
                className="bg-gray-600 cursor-pointer text-slate-200 rounded-xg w-20 align-middle items-center justify-center flex hover:bg-gray-400"
              >
                login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
