import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { MdMore } from 'react-icons/md';

const data = [
  {
    firstName: 'hello me',
    lastName: 'jane',
    id: '1',
    team: 'marketting',
    email: 'marybenbenzy@gai.com',
    phone: '25471040703',
  },
  {
    firstName: 'hello me',
    lastName: 'jane',
    id: '2',
    team: 'marketting',
    email: 'marybenbenzy@gai.com',
    phone: '25471040703',
  },
  {
    firstName: 'hello me',
    lastName: 'jane',
    id: '3',
    team: 'marketting',
    email: 'marybenbenzy@gai.com',
    phone: '25471040703',
  },
  {
    firstName: 'hello me',
    lastName: 'jane',
    id: '4',
    team: 'marketting',
    email: 'marybenbenzy@gai.com',
    phone: '25471040703',
  },
  {
    firstName: 'hello me',
    lastName: 'jane',
    id: '5',
    team: 'marketting',
    email: 'marybenbenzy@gai.com',
    phone: '25471040703',
  },
];

function EmployeesPage() {
  return (
    <div className="bg-slate-800 rounded-md p-5 mt-5">
      <div className="flex flex-row items-center justify-between">
        <Suspense>
          <Search placeholder="search by id" />
        </Suspense>
        <Link href={'/dashboard/users/add'}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            Add New
          </button>
        </Link>
      </div>
      <table className="bg-gray-600 rounded-md  w-full mt-5">
        <thead>
          <tr>
            {' '}
            <td>ID</td>
            <td>firstName</td>
            <td>lastName</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Team</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item?.id} className="">
              <td className="">{item?.id}</td>
              <td className=" font-extralight">{item?.firstName}</td>
              <td className="">{item?.lastName}</td>
              <td className="">{item?.email}</td>
              <td className="">{item?.phone}</td>
              <td className="">{item?.team}</td>

              <td>
                <MdMore className="" size={24} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={0} />
    </div>
  );
}

export default EmployeesPage;
