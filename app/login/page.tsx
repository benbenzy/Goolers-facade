import React from 'react';
import { supabaseLogin } from '../../utils/supabase/actions';

async function LoginPage() {
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
      <div className="bg-slate-700 flex flex-col justify-center items-center gap-5 w-2/5  self-center rounded-md">
        <h1 className="uppercase font-extrabold mt-10">login</h1>

        <form className="w-full justify-center items-center self-center flex flex-col gap-2">
          <label className="input input-bordered flex items-center gap-2 self-center dark:text-slate-100  text-slate-900 w-3/4">
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
              className="dark:bg-slate-300"
              id="email"
              //value={email}
              name="email"
              //onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 dark:text-slate-100  text-slate-900 w-3/4">
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
              name="password"
              id="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
              className="dark:bg-slate-300 "
            />
          </label>

          <button
            formAction={supabaseLogin}
            //onClick={handleSignIn}
            className="btn btn-info btn-lg w-3/4"
          >
            login
          </button>
        </form>
        <div>
          dont have account{' '}
          <a className="text-blue-500" href="/register">
            register here
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
