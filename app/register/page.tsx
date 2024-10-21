'use client';
import { supabaseSignup } from '@/utils/supabase/actions';
import Image from 'next/image';
import React from 'react';

function RegisterPage() {
  return (
    <div className="flex justify-center items-center flex-col w-screen  grow">
      <form
        action=""
        className="bg-slate-700 flex flex-col gap-5 w-2/5  justify-center items-center  rounded-md"
      >
        <h1 className="uppercase font-extrabold mt-10">Register</h1>
        <label className="input input-bordered flex items-center gap-2 w-3/4 text-slate-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          Firstname
          <input
            type="text"
            className="grow"
            placeholder="FirstName"
            name="firstName"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-900 w-3/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          Lastname
          <input
            type="text"
            className=""
            placeholder="LastName"
            name="lastName"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-900 w-3/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 to-black"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          Email
          <input
            type="email"
            className=""
            placeholder="Email"
            name="email"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-900 w-3/4">
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1em"
            height="1em"
          >
            <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
          </svg>
          Phone
          <input
            type="tel"
            placeholder="phone"
            name="phone"
            required
            className=" "
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-900 w-3/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-4 h-4 opacity-70 to-black"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          Password
          <input
            type="password"
            placeholder="password"
            name="password"
            required
            className=" "
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 text-slate-900 w-3/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            className="w-4 h-4 opacity-70 to-black"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          confirm Password
          <input
            type="password"
            name="password"
            placeholder="confirm password"
            className=" "
          />
        </label>

        <button
          type="submit"
          formAction={supabaseSignup}
          className="btn  btn-info btn-lg w-3/4"
        >
          register
        </button>
        <div>
          have account{' '}
          <a className="text-blue-500" href="/login">
            login here
          </a>
        </div>

        <button className="btn btn-neutral btn-lg w-3/4 mb-10">
          <Image src={'/google.png'} alt="" width={24} height={24} />
          login with google
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
