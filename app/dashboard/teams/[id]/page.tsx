'use client';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { TablesInsert } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React, { FC, useEffect, useRef, useState } from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdEdit,
  MdMoreVert,
  MdRemoveRedEye,
} from 'react-icons/md';

interface CourseDetailsProps {
  params: {
    courseId: string;
  };
}

const TeamDeatilsPage: FC<CourseDetailsProps> = () => {
  const pathname = usePathname();
  const supabase: SupabaseClient = createClient();
  const [image, setImage] = useState<File | any>(null);
  const [team, setTeam] = useState<any>();
  const [onEdit, setOnEdit] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [uploading, setUploading] = useState(false);
  const imageRef = useRef<any>();
  const id = pathname.split('/').pop();

  const { data } = useQuery({
    queryKey: ['teams', id],
    queryFn: async () => {
      const { data: loadCourse, error } = await supabase
        .from('teams')
        .select('*,players(*),wards(*),counties(*),constituencies(*)')
        .eq('id', id)
        .single();
      if (error) {
        console.log('failed to get course by id client');
      }
      return loadCourse;
    },
  });
  useEffect(() => {
    setTeam(data);
  }, [data]);

  const uploadImage = async () => {
    setUploading(true);
    const fileExt = image?.name?.split('.').pop();
    const filePath = `${team?.id}-${Math.random()}.${fileExt}`;
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
        .eq('id', team?.id);
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
          ward_id: league.ward,
          constituency_id: league?.sub_county,
          county_id: league.county,
        })
        .eq('id', league?.id);
      if (error) {
        throw new Error('error upadating course');
      }
      return data;
    },
  });

  const handleUpdate = () => {
    updateCourse(team);
  };
  function handleDelete() {
    deleteTeam();
  }
  const {
    mutate: deleteTeam,
    isError: deleteChapterError,
    isPending: deleting,
    isSuccess: deletesuccess,
  } = useMutation({
    mutationFn: async () => {
      console.log('deleting chapter');
      const { data, error } = await supabase
        .from('chapters')
        .delete()
        .eq('id', selectedChapter)
        .select();
      if (error) {
        console.log('failed to delete chapter', error.message);
        throw new Error(`failed to delete chapter ${error.message}`);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', id] });
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
            path={`${team?.poster}`}
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
          <table className="table">
            <thead>
              <tr>
                <td>Details</td>
                <td>
                  <button
                    onClick={() => {
                      setOnEdit(true);
                    }}
                    className="btn btn-neutral"
                  >
                    update
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td> <td>{team?.name}</td>
              </tr>
              <tr>
                <td>Captain</td>{' '}
                <td>{team?.captains?.players?.name ?? 'no captain'}</td>
              </tr>
              <tr>
                <td>County</td> <td>{team?.counties?.name}</td>
              </tr>
              <tr>
                <td>Sub-County</td> <td>{team?.constituencies?.name}</td>
              </tr>
              <tr>
                <td>Ward</td> <td>{team?.wards?.name}</td>
              </tr>
              <tr>
                <td>Balance</td> <td>{team?.balance ?? 0}</td>
              </tr>
            </tbody>
          </table>
          <Modal onclose={() => setOnEdit(false)} show={onEdit}>
            <div className="flex flex-col items-center justify-center ">
              <Button
                variant="flat"
                type="submit"
                className="mt-1 btn btn-primary"
                disabled={false}
                onClick={() => {}}
                loading={true}
              >
                <label htmlFor="">submit</label>
              </Button>
            </div>
          </Modal>
        </div>
      </div>

      <div className="flex flex-row justify-between m-5">
        <div className=" font-bold uppercase underline">Players</div>
        <Link href={'/dashboard/players/new'}>
          <button onClick={() => {}} className="btn btn-neutral">
            Add Player
          </button>
        </Link>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th> <th>createdAt</th> <th>reviewed</th>
            <th>completed</th> <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {team?.players?.map((item: any, index: number) => (
            <tr key={item?.id}>
              <td>{index + 1}</td>
              <td>
                <div>{item?.name}</div>
              </td>
              <td>
                <div>{new Date(item?.created_at).toDateString()}</div>
              </td>
              <td>
                <div>
                  {item?.published ? (
                    <MdCheckBox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </div>
              </td>

              <td>
                <div>{item?.published ? 'reviwed' : 'complete'}</div>
              </td>
              <td>
                <button
                  onClick={() => {
                    selectedChapter == item.id
                      ? setSelectedChapter('')
                      : setSelectedChapter(item.id);
                  }}
                >
                  <MdMoreVert />
                </button>
                {selectedChapter == item.id && (
                  <div className="flex flex-col gap-2 absolute bg-slate-700">
                    <Link
                      href={{
                        pathname: `/dashboard/products/${id}/newChapter`,
                        query: {
                          requestType: 'edit',
                          courseId: id,
                          chapterId: selectedChapter,
                        },
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
                      onClick={() => {
                        let text = 'confirm delete';
                        if (confirm(text) == true) {
                          handleDelete();
                        } else {
                          text = 'You canceled!';
                        }
                      }}
                      className="flex flex-row gap-2 items-center text-red-500 hover:bg-slate-400 hover:cursor-pointer"
                    >
                      <MdDelete /> remove
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
};

export default TeamDeatilsPage;
