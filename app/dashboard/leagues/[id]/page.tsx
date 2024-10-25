'use client';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
import { TablesInsert } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { FC, useEffect, useRef, useState } from 'react';

interface CourseDetailsProps {
  params: {
    courseId: string;
  };
}

const CourseDeatilsPage: FC<CourseDetailsProps> = () => {
  const pathname = usePathname();
  const supabase: SupabaseClient = createClient();
  const [image, setImage] = useState<File | any>(null);
  const [league, setLeague] = useState<any>();
  const [onEdit, setOnEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const imageRef = useRef<any>();
  const id = pathname.split('/').pop();

  const { data } = useQuery({
    queryKey: ['leagues', id],
    queryFn: async () => {
      const { data: loadCourse, error } = await supabase
        .from('leagues')
        .select('*,league_teams(*,teams(*))')
        .eq('id', id)
        .single();
      if (error) {
        console.log('failed to get course by id client');
      }
      return loadCourse;
    },
  });
  useEffect(() => {
    setLeague(data);
  }, [data]);

  const uploadImage = async () => {
    setUploading(true);
    const fileExt = image?.name?.split('.').pop();
    const filePath = `${league?.id}-${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('league_posters')
      .upload(filePath, image);
    if (error) {
      setUploading(false);
      console.log('image could not be uploaded', error);
      setImage(null);
    }
    if (data?.path) {
      const { data: courseUpdate, error: courseUpdateError } = await supabase
        .from('leagues')
        .update({ poster: data.path })
        .eq('id', league?.id);
      if (courseUpdateError) {
        console.log('could not update league', courseUpdateError);
        setUploading(false);
        setImage(null);
      }
      console.log('updated', courseUpdate);
      setUploading(false);
      setImage(null);
    }
  };
  const {
    mutate: updateCourse,
    isError: updateError,
    isPending: updating,
    isSuccess: updatesuccess,
  } = useMutation({
    mutationFn: async (league: TablesInsert<'leagues'>) => {
      const { data, error } = await supabase
        .from('leagues')
        .update({
          name: league.name,
          budget: league.budget,
          start_date: league.start_date,
          end_date: league.end_date,
          ward_id: league?.ward,
          constituency_id: league?.sub_county,
          county_id: league?.county,
        })
        .eq('id', league?.id);
      if (error) {
        throw new Error('error upadating course');
      }
      return data;
    },
  });

  const handleUpdate = () => {
    updateCourse(league);
  };
  function handleDelete(id: string) {
    deleteTeam(id);
  }
  const {
    mutate: deleteTeam,
    isError: deleteChapterError,
    isPending: deleting,
    isSuccess: deletesuccess,
  } = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('league_teams')
        .delete()
        .eq('id', id);
      if (error) {
        console.log('failed to delete chapter', error.message);
        throw new Error(`failed to delete chapter ${error.message}`);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues', id] });
    },
  });

  const queryClient = useQueryClient();

  return (
    <div>
      {updateError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to update </span>
          </div>
        </div>
      )}
      {updatesuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>updated </span>
          </div>
        </div>
      )}
      {updating && (
        <div className="toast">
          <div className="alert alert-success">
            <span>suubmitting update... </span>
          </div>
        </div>
      )}

      {deleteChapterError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to delete </span>
          </div>
        </div>
      )}
      {deletesuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>deleted</span>
          </div>
        </div>
      )}
      {deleting && (
        <div className="toast">
          <div className="alert alert-success">
            <span>deleting ... </span>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-between">
        <div className="w-1/4 ">
          <RemoteImage
            path={`${league?.poster}`}
            fallback="/noproduct.jpg"
            size={120}
            className=" w-56 h-3/4"
            bucket={'league_posters'}
            alt={''}
            onClick={() => imageRef?.current?.click()}
            uploadImage={image}
            cancelled={!image}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e: any) => setImage(e.target.files[0])}
            ref={imageRef}
          />
          {image && (
            <div>
              {uploading ? (
                <div>uploading ...</div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => uploadImage()}
                    className="bg-green-500 "
                  >
                    upload
                  </button>
                  <button
                    onClick={() => setImage(null)}
                    className="bg-slate-400"
                  >
                    cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={league?.name}
              onChange={(e) => {
                setOnEdit(true), setLeague({ ...league, name: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">County</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={league?.county}
              onChange={(e) => {
                setOnEdit(true),
                  setLeague({ ...league, county: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Sub-County</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={league?.sub_county}
              onChange={(e) => {
                setOnEdit(true),
                  setLeague({ ...league, sub_county: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Ward</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={league?.ward}
              onChange={(e) => {
                setOnEdit(true), setLeague({ ...league, ward: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Budget</label>
            <input
              type="text"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={league?.budget}
              onChange={(e) => {
                setOnEdit(true),
                  setLeague({ ...league, budget: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Start Date</label>
            <input
              type="date"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={league?.start_date}
              onChange={(e) => {
                setOnEdit(true),
                  setLeague({ ...league, start_date: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">End Date</label>
            <input
              type="date"
              className="text-slate-900 p-2 rounded-l dark:bg-slate-700  dark:text-slate-100"
              value={league?.end_date}
              onChange={(e) => {
                setOnEdit(true),
                  setLeague({ ...league, start_date: e.target.value });
              }}
            />
          </div>
        </div>
      </div>

      {onEdit && (
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-300 p-2 m-5 rounded-md"
        >
          update
        </button>
      )}
      <div className="flex flex-row justify-between m-5">
        <div className=" font-bold uppercase underline">Registered Teams</div>

        <Link href={`/dashboard/leagues/${id}/newTeam`}>Add Team</Link>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th> <th>createdAt</th> <th>reviewed</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {league?.league_teams?.map((item: any, index: number) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <div>{item?.teams?.name}</div>
              </td>
              <td>
                <div>{new Date(item?.created_at).toDateString()}</div>
              </td>
              <td>
                <div>{item?.reviewed ? 'reviewed' : 'pending'}</div>
              </td>

              <td>
                <div className="flex flex-row items-center gap-5">
                  <Link
                    className="btn btn-success"
                    href={{
                      pathname: `/dashboard/teams/${item?.teams?.id}`,
                    }}
                  >
                    open
                  </Link>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      const text = 'do you want to remove item';
                      if (confirm(text) === true) {
                        handleDelete(item?.id);
                      } else {
                        return;
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseDeatilsPage;
