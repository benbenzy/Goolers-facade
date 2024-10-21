'use client';
import Search from '@/app/ui/dashboard/search/search';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { MdDelete, MdMore, MdRemoveRedEye } from 'react-icons/md';

function TransactionsPage() {
  const supabase = createClient();
  const [selectedItem, setSelectedItem] = useState('');
  const { data: transactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      return res.data;
    },
  });
  async function handleDeleteTransaction() {}
  return (
    <div>
      <div className="flex flex-row items-center justify-between mt-2">
        <Suspense>
          <Search placeholder="enter transaction code" />
        </Suspense>
        <Link href={`/dashboard/transactions`}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            Add transaction
          </button>
        </Link>
      </div>
      <table className="bg-gray-600 rounded-md  w-full mt-5">
        <thead>
          <tr>
            <td>checkout_code</td>

            <td>amount</td>
            <td>Method</td>
            <td>Created At</td>
            <td>Phone</td>
            <td>status</td>
            <td>Action</td>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(transactions) &&
            transactions?.map((item: any) => (
              <tr key={item?.id} className="">
                <td className="">{item?.checkout_request_id}</td>

                <td className=" font-extralight">{item?.amount}</td>
                <td className="">{item?.method}</td>

                <td className="">
                  {new Date(item?.created_at).toDateString()}
                  <span> at {new Date(item?.created_at).getHours()}</span>
                  <span>:{new Date(item?.created_at).getMinutes()}</span>
                </td>
                <td className="">{item?.phone_number}</td>
                <td
                  className={` font-medium p-2 ${
                    item.status === 'waiting'
                      ? 'text-yellow-600'
                      : item.status === 'success'
                      ? 'text-lime-600'
                      : item.status === 'reversed'
                      ? 'text-gray-400'
                      : 'text-red-600'
                  }`}
                >
                  {item?.status}
                </td>

                <td>
                  <MdMore
                    className=""
                    size={24}
                    onClick={() =>
                      selectedItem === item?.id
                        ? setSelectedItem('')
                        : setSelectedItem(item?.id)
                    }
                  />
                  {selectedItem === item?.id && (
                    <div className="flex flex-col gap-2 absolute bg-slate-800 rounded-md right-20 text-slate-200">
                      <Link
                        className="items-center  hover:bg-slate-600"
                        href={{
                          pathname: `/dashboard/transactions/${item.id}`,
                          query: { id: item.id },
                        }}
                      >
                        <button className="flex flex-row gap-1 items-center  hover:bg-slate-600">
                          <MdRemoveRedEye /> view
                        </button>
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsPage;
