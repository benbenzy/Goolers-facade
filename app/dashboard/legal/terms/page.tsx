'use client';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { MdHorizontalDistribute, MdMoreHoriz } from 'react-icons/md';

function TermsPage() {
  const [activeIndex, setActiveIndex] = useState('');
  const supabase = createClient();
  const {
    data: terms,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['terms'],
    queryFn: async () => {
      const { data, error } = await supabase.from('terms').select('*');
      if (error) {
        console.log('failed to fetch terms', error.message);
      }
      return data;
    },
  });
  const handleDeleteItem = (id: any) => {
    deleteItem(id);
  };
  const {
    mutate: deleteItem,
    isPending: deleteItemProgress,
    isError: deleteItemError,
    isSuccess: deleteItemSuccess,
  } = useMutation({
    mutationFn: async (id: any) => {
      const res = await axios.delete(`/api/terms/${id}`);
    },
  });
  return (
    <div className="bg-slate-800 rounded-md p-5 mt-5">
      <div className="flex flex-row items-center justify-between">
        <Suspense>
          <Search placeholder="search terms by name" />
        </Suspense>
        <Link
          href={{
            pathname: '/dashboard/legal/createTerms',
            query: { requestType: 'create', category: 'terms' },
          }}
        >
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            Add New
          </button>
        </Link>
      </div>
      {isLoading && <div>loading ...</div>}
      {isError && <div> error loading</div>}
      {deleteItemError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to delete item</span>
          </div>
        </div>
      )}
      {deleteItemProgress && (
        <progress className="progress w-56">processing delete...</progress>
      )}
      {deleteItemSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>course deleted</span>
          </div>
        </div>
      )}

      {Array.isArray(terms) &&
        terms?.map((item) => {
          return (
            <div key={item?.id} className="mt-5">
              <div className="flex flex-row justify-between">
                <h2 className=" font-bold underline capitalize">
                  {item?.title}
                </h2>
                <td>{new Date(item?.created_at).toDateString()}</td>
                <td>{new Date(item?.updated_at).toDateString()}</td>{' '}
                <td>{item?.editor}</td> <MdMoreHoriz size={24} />
              </div>
              <p>{item?.message}</p>
            </div>
          );
        })}

      <Pagination page={0} />
    </div>
  );
}

export default TermsPage;
