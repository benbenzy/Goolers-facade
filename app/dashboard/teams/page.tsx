'use client';
import Search from '@/app/ui/dashboard/search/search';
import { Tables } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { Suspense, useState } from 'react';
import { MdMoreVert, MdRemoveRedEye, MdEdit, MdDelete } from 'react-icons/md';

function TeamsPage() {
  const supabase = createClient();
  const [activeIndex, setActiveIndex] = useState('');

  const { data: teams } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*,wards(name),captains(*)');
      if (error) {
        console.log('failed to retlieve teams', error.message);
      }
      return data;
    },
  });
  return (
    <div>
      <div className="flex flex-row items-center justify-between mt-5 mb-5">
        <Suspense>
          <Search placeholder="search team by name or id" />
        </Suspense>
        <Link href={'/dashboard/teams/add'}>
          <button className="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer rounded-md text-slate-200 border-none">
            new team
          </button>
        </Link>
      </div>
      <table className="bg-gray-600 rounded-md table w-full mt-5 p-4  ">
        <thead>
          <tr>
            <td>Name</td>
            <td>Created At</td>
            <td>County</td>
            <td>Sub-county</td>
            <td>Ward</td>
            <td>Captain</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(teams) &&
            teams?.map((item: any) => (
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
                <td>{item?.county}</td>
                <td>{item?.sub_county}</td>
                <td>{item?.wards?.name}</td>
                <td>{item?.captains?.name}</td>
                <td>{item?.active ? 'active' : 'N-active'}</td>
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
                      <Link
                        href={{
                          pathname: `/dashboard/teams/${activeIndex}`,
                        }}
                      >
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
    </div>
  );
}

export default TeamsPage;
