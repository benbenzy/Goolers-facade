'use client';
import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';
import { Tables } from '@/database.types';
import { useAuth } from '@/app/context/authContext';

interface NavlinksProps {
  user?: Tables<'profiles'>;
}

export default function Navlinks() {
  const router = useRouter();
  const { currentUser: user } = useAuth();
  const pathName = usePathname();
  return (
    <div className="relative flex flex-row justify-between py-4 align-center items-center md:py-6">
      <div className="flex flex-row gap-2">
        <Link href="/" aria-label="Logo">
          <div className="flex flex-row rounded-full items-center p-2 ">
            <h2 className="font-extrabold text-zinc-300">Mtoto</h2>
            <h2 className="font-extrabold text-red-600 ">Sharp</h2>
            <h2 className="font-extrabold text-yellow-600 "> Foundation</h2>
          </div>
        </Link>
        {user && user?.group == 'ADMIN' && (
          <Link href="/dashboard" className={s.link}>
            <span className="bg-slate-700 p-2 rounded-md"> DASHBOARD</span>
          </Link>
        )}
      </div>

      <div className="flex justify-end space-x-8">
        <Link href="/message" className={s.link}>
          contact us
        </Link>
        {user && (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={pathName} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        )}
        {!user && (
          <Link href="/signin" className={s.link}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
