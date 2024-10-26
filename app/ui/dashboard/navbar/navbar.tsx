'use client';
import { useAuth } from '@/app/context/authContext';
import Link from 'next/link';
import React from 'react';
import { MdNotifications, MdOutlineChat, MdSearch } from 'react-icons/md';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import s from '../../../../components/ui/Navbar/Navbar.module.css';

function Navbar() {
  const auth = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className=" bg-slate-800 rounded-md  items-center flex flex-row justify-between p-5">
      <div className=" text-slate-300 capitalize font-mono">
        {pathName.split('/').pop()}
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
        <div className="flex flex-row items-center gap-2">
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <div>
            {auth?.currentUser ? (
              <form
                className="items-center"
                onSubmit={(e) => handleRequest(e, SignOut, router)}
              >
                <input type="hidden" name="pathName" value={pathName} />
                <button type="submit" className={s.link}>
                  Sign out
                </button>
              </form>
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
