'use client';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import React, { Suspense } from 'react';

function TeamsPage() {
  const teams = [
    { id: '1', name: 'marketting', membersIDs: [1, 2, 3, 4] },
    { id: '2', name: 'sales', membersIDs: [1, 2, 3, 4] },
    { id: '3', name: 'finance', membersIDs: [1, 2, 3, 4] },
    { id: '4', name: 'support', membersIDs: [1, 2, 3, 4] },
    { id: '5', name: 'research', membersIDs: [1, 2, 3, 4] },
    { id: '6', name: 'budget', membersIDs: [1, 2, 3, 4] },
  ];
  // const { data: teams } = useQuery<Team[]>({
  //   queryKey: ["teams"],
  //   queryFn: async () => {
  //     const res = await axios.get("/api/teams");
  //     return res.data;
  //   },
  // });
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
      <div className=" grid grid-cols-2 gap-5 nu">
        {teams?.map((item) => (
          <div key={item.id} className="card w-full bg-slate-700 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title touppercase">{item?.name}</h2>
              <p>{item?.membersIDs?.length} members</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">open</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamsPage;
