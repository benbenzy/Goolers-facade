'use client';
import { LeagueFormPost, TeamFormPost } from '@/app/types/types.d';

import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface props {
  submit: SubmitHandler<TeamFormPost>;
}

const AddTeamForm: FC<props> = ({ submit }) => {
  const supabase = createClient();
  const { register, handleSubmit, watch } = useForm<TeamFormPost>();
  const county_id = watch('county_id');
  const constituency_id = watch('sub_county_id');

  const { data: counties, isLoading: countiesLoading } = useQuery({
    queryKey: ['counties'],
    queryFn: async () => {
      const { data, error } = await supabase.from('counties').select('*');
      if (error) {
        console.log('error loadig counties', error.message);
      }
      return data;
    },
  });
  const { data: constituencies, isLoading: constituenciesLoading } = useQuery({
    queryKey: ['sub-counties', county_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('constituencies')
        .select('*')
        .eq('county_id', county_id);
      if (error) {
        console.log('error loadig counties', error.message);
      }
      return data;
    },
    enabled: !!county_id,
  });
  const { data: wards, isLoading: wardsLoading } = useQuery({
    queryKey: ['wards', constituency_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wards')
        .select('*')
        .eq('constituency_id', constituency_id);
      if (error) {
        console.log('error loadig counties', error.message);
      }
      return data;
    },
    enabled: !!constituency_id,
  });

  const isLoading = countiesLoading || constituenciesLoading || wardsLoading;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=" w-full gap-5 dark:text-slate-100 p-5 mt-5 flex flex-col "
    >
      <div className="flex flex-row gap-5 items-center">
        Team Name
        <input
          type="text"
          placeholder="name"
          required
          className=" w-11s h-8 text-slate-900 rounded-md  dark:text-slate-100 dark:bg-slate-700"
          {...register('name')}
        />
      </div>

      {countiesLoading ? (
        <div>county</div>
      ) : (
        <div className="flex flex-row gap-5 items-center">
          <label htmlFor="">County</label>
          <select
            {...register('county_id')}
            // onChange={(e) => setCountyId(e.target.value)}
            id="cat"
            className="p-2 bg-slate-600 rounded-md text-slate-200 "
          >
            <option>select county</option>
            {Array.isArray(counties) &&
              counties?.map((item: any) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {constituenciesLoading ? (
        <div>sub-county</div>
      ) : (
        <div className="flex flex-row gap-5 items-center">
          Sub-County
          <select
            {...register('sub_county_id')}
            //onChange={(e) => setConstituencyId(e.target.value)}
            id="cat"
            className="p-2 bg-slate-600 rounded-md text-slate-200 "
          >
            <option>select sub-county</option>
            {Array.isArray(constituencies) &&
              constituencies?.map((item: any) => (
                <option className=" text-black" value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
          </select>
        </div>
      )}
      {wardsLoading ? (
        <div>ward</div>
      ) : (
        <div className="flex flex-row gap-5 items-center">
          Ward
          <select
            {...register('ward_id')}
            id="cat"
            className="p-2 bg-slate-600 rounded-md text-slate-200 "
          >
            <option>select ward</option>
            {Array.isArray(wards) &&
              wards?.map((item: any) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
          </select>
        </div>
      )}

      <div className="gap-5 dark:text-slate-100"></div>

      <button
        type="submit"
        className="p-3 w-full bg-blue-500 rounded-lg border-none mt-4 mb-4"
      >
        Submit
      </button>
    </form>
  );
};

export default AddTeamForm;
