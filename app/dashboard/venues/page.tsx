'use client';

import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { MdMoreVert, MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

function VenuesPage() {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [activeIndex, setActiveIndex] = useState('');
  const { data: captains } = useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('venues')
        .select('*,counties(name),constituencies(name),wards(name)');
      if (error) {
        console.log('failed to load captain', error.message);
      }
      return data;
    },
  });
  const handleDelete = (id: string) => {
    removevenue(id);
  };
  const {
    mutate: removevenue,
    isPending: deletePending,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('venues')
        .delete()
        .eq('id', id);
      if (error) {
        console.log('failed to remove item', error.message);
      }
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['venues'] }),
  });
  return (
    <div className="bg-slate-800 rounded-md p-5 mt-5">
      <div className="flex flex-row items-center justify-between">
        <Suspense>
          <Search placeholder="search by team name" />
        </Suspense>
        <Link href={'/dashboard/venues/new'}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            Add New
          </button>
        </Link>
      </div>

      {deleteError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to delete item</span>
          </div>
        </div>
      )}
      {deletePending && (
        <progress className="progress w-56">processing delete...</progress>
      )}
      {deleteSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>course deleted</span>
          </div>
        </div>
      )}
      <table className="bg-gray-600 rounded-md table w-full mt-5 p-4  ">
        <thead>
          <tr>
            <td>Name</td>
            <td>created At</td>

            <td>County</td>
            <td>Sub County</td>
            <td>Ward</td>
            <td>Codition</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(captains) &&
            captains?.map((item: any) => (
              <tr key={item?.id} className="m-5 hover  ">
                <td className="w-32">
                  {/* <div className="flex items-center gap-3">
                <RemoteImage
                  size={0}
                  className="h-16 w-28 object-cover rounded-md"
                  fallback={'/noproduct.jpg'}
                  bucket="course_thumbnails"
                  path={item?.thumbnail}
                  alt={''}
                />
              </div> */}
                  {item?.name}
                </td>
                <td>{new Date(item?.created_at).toDateString()}</td>

                <td>{item?.counties?.name}</td>
                <td>{item?.constituencies?.name}</td>
                <td>{item?.wards?.name}</td>
                <td>{item?.status}</td>
                <td>
                  <button
                    onClick={() => {
                      if (confirm('remove this user') == true) {
                        handleDelete(item?.id);
                      } else {
                        return;
                      }
                    }}
                    className="btn btn-error"
                  >
                    remove
                  </button>
                </td>
                <td>
                  <MdMoreVert
                    size={25}
                    onClick={() =>
                      activeIndex === item.id
                        ? setActiveIndex('')
                        : setActiveIndex(item.id)
                    }
                  />
                  {activeIndex == item.id && (
                    <div className="flex flex-col gap-2 absolute bg-slate-700">
                      <Link href={`/dashboard/players/${activeIndex}`}>
                        <button
                          onClick={() => {}}
                          className="flex flex-row items-center gap-2 text-green-500 hover:bg-slate-400 hover:cursor-pointer"
                        >
                          <MdRemoveRedEye /> open
                        </button>
                      </Link>

                      <button
                        onClick={() => {}}
                        className="flex flex-row items-center gap-2 text-green-500 hover:bg-slate-400 hover:cursor-pointer"
                      >
                        <MdEdit /> edit title
                      </button>

                      <button
                        onClick={() => {}}
                        className="flex flex-row gap-2 items-center text-red-500 hover:bg-slate-400 hover:cursor-pointer"
                      >
                        <MdDelete /> delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination page={0} />
    </div>
  );
}

export default VenuesPage;
