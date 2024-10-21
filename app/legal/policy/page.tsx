'use client';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function PolicyPage() {
  const supabase = createClient();
  const { data: terms } = useQuery({
    queryKey: ['terms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('terms')
        .select('*')
        .order('index', { ascending: true });
      if (error) {
        console.log('failed to load terms');
      }
      return data;
    },
  });
  return (
    <div className="w-full items-center flex-1 flex flex-col">
      <nav>
        <h1 className=" font-extrabold">
          Mtoto<span className="text-red-700">Sharp</span>{' '}
          <span className="text-yellow-600">Foundation</span>
        </h1>
      </nav>
      <h1 className="font-bold">Terms and Service Use</h1>

      {Array.isArray(terms) &&
        terms.map((item) => {
          return (
            <div key={item?.id} className=" w-4/5 mt-5">
              <div className="flex flex-row gap-5">
                <h2 className=" font-bold capitalize underline">
                  {item?.title}
                </h2>
                <h4 className=" font-thin">
                  last updated {new Date(item?.created_at).toDateString()}
                </h4>
              </div>
              <p className="mt-2">{item.message}</p>
            </div>
          );
        })}
    </div>
  );
}

export default PolicyPage;
