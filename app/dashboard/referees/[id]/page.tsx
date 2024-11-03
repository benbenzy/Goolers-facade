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
interface CourseDetailsProps {
  params: {
    courseId: string;
  };
}

const PlayerDeatilsPage: FC<CourseDetailsProps> = () => {
  const pathname = usePathname();
  const supabase: SupabaseClient = createClient();
  const [image, setImage] = useState<File | any>(null);
  const [player, setPlayer] = useState<any>();
  const [onEdit, setOnEdit] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [uploading, setUploading] = useState(false);
  const imageRef = useRef<any>();
  const id = pathname.split('/').pop();
  const [county_id, setCountyId] = useState('');
  const [sub_county_id, setSubCountyId] = useState('');
  const [ward_id, setWardId] = useState('');
  const [team_id, setTeamId] = useState('');

  const { data } = useQuery({
    queryKey: ['player_details', id],
    queryFn: async () => {
      const { data: loadCourse, error } = await supabase
        .from('players')
        .select('*,counties(*),constituencies(*),wards(*),profiles(*),teams(*)')
        .eq('id', id)
        .single();
      if (error) {
        console.log('failed to get player by id client', error.message);
      }
      return loadCourse;
    },
  });
  useEffect(() => {
    setPlayer(data);
  }, [data]);

  const uploadImage = async () => {
    setUploading(true);
    const fileExt = image?.name?.split('.').pop();
    const filePath = `${player?.id}-${Math.random()}.${fileExt}`;
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
        .eq('id', player?.id);
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

  const queryClient = useQueryClient();

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
        console.log('error loadig sub_counties', error.message);
      }
      return data;
    },
    enabled: !!county_id,
  });
  const { data: wards, isLoading: wardsLoading } = useQuery({
    queryKey: ['wards', sub_county_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wards')
        .select('*')
        .eq('constituency_id', sub_county_id);
      if (error) {
        console.log('error loadig wards', error.message);
      }
      return data;
    },
    enabled: !!sub_county_id,
  });
  const { data: teams, isLoading: teamLoading } = useQuery({
    queryKey: ['teams', ward_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('ward_id', ward_id);
      if (error) {
        console.log('error loadig teams', error.message);
      }
      return data;
    },
    enabled: !!ward_id,
  });
  const { data: redCards } = useQuery({
    queryKey: ['red_cards', id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('red_cards')
        .select('*', { count: 'exact' })
        .eq('player_id', id);
      if (error) {
        console.log('error loadig teams', error.message);
      }
      return count;
    },
    enabled: !!id,
  });
  const { data: yellowCards } = useQuery({
    queryKey: ['yellow_cards', id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('red_cards')
        .select('*', { count: 'exact' })
        .eq('player_id', id);
      if (error) {
        console.log('error loadig teams', error.message);
      }
      return count;
    },
    enabled: !!id,
  });
  const {
    mutate: updatePlayerDetails,
    isPending: updatingPlayer,
    isSuccess,
  } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .update({ county_id, sub_county_id, ward_id, team_id })
        .eq('id', id)
        .select();
      if (error) {
        console.log('failed to update player', error.message);
      }
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['player_details', id] }),
  });
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="w-1/4 ">
          <RemoteImage
            path={`${player?.profiles?.image}`}
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

        <div className="flex flex-col  flex-1">
          <div className="flex flex-row items-center justify-between p-5">
            <div className="">Details</div>
            <button onClick={() => setOnEdit(true)} className="btn btn-neutral">
              Update
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <td></td> <td></td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Name</td> <td>{player?.name}</td>
              </tr>
              <tr>
                <td>Email</td> <td>{player?.email}</td>
              </tr>
              <tr>
                <td>Phone</td> <td>{player?.phone}</td>
              </tr>
              <tr>
                <td>County</td> <td>{player?.counties?.name}</td>
              </tr>
              <tr>
                <td>Sub-County</td> <td>{player?.constituencies?.name}</td>
              </tr>
              <tr>
                <td>Ward</td> <td>{player?.wards?.name}</td>
              </tr>
              <tr>
                <td>Team</td> <td>{player?.teams?.name}</td>
              </tr>
              <tr>
                <td>Red cards</td> <td>{redCards}</td>
              </tr>
              <tr>
                <td>Yellow Cards</td> <td>{yellowCards ?? 0}</td>
              </tr>
              <tr>
                <td>Matches</td> <td>{33}</td>
              </tr>
            </tbody>
          </table>
          <Modal onclose={() => setOnEdit(false)} show={onEdit}>
            <div className="flex flex-col items-center justify-center ">
              {isSuccess && <div>success </div>}
              {countiesLoading ? (
                <div>county</div>
              ) : (
                <div className="gap-10 label w-full">
                  <label htmlFor="">County</label>
                  <select
                    onChange={(e) => setCountyId(e.target.value)}
                    id="cat"
                    className=" select select-bordered p-2 bg-slate-600 rounded-md text-slate-200 w-1/2"
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
                <div>sub_county</div>
              ) : (
                <div className="label gap-10 w-full">
                  <label htmlFor="">Sub County</label>
                  <select
                    onChange={(e) => setSubCountyId(e.target.value)}
                    id="cat"
                    className=" select select-bordered p-2 bg-slate-600 rounded-md text-slate-200 w-1/2"
                  >
                    <option>select sub county</option>
                    {Array.isArray(constituencies) &&
                      constituencies?.map((item: any) => (
                        <option value={item?.id} key={item?.id}>
                          {item?.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              {wardsLoading ? (
                <div>ward</div>
              ) : (
                <div className="label gap-10 w-full ">
                  <label htmlFor="">Ward</label>
                  <select
                    onChange={(e) => setWardId(e.target.value)}
                    id="cat"
                    className="select select-bordered p-2 bg-slate-600 rounded-md text-slate-200 w-1/2"
                  >
                    <option>select ward</option>
                    {Array.isArray(counties) &&
                      wards?.map((item: any) => (
                        <option value={item?.id} key={item?.id}>
                          {item?.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              {teamLoading ? (
                <div>Team</div>
              ) : (
                <div className="label gap-10 w-full">
                  <label htmlFor="">Team</label>
                  <select
                    onChange={(e) => setTeamId(e.target.value)}
                    id="cat"
                    className=" select select-bordered p-2 bg-slate-600 rounded-md text-slate-200 w-1/2"
                  >
                    <option>select team</option>
                    {Array.isArray(teams) &&
                      teams?.map((item: any) => (
                        <option value={item?.id} key={item?.id}>
                          {item?.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <Button
                variant="flat"
                type="submit"
                className="mt-1 btn btn-primary"
                disabled={updatingPlayer}
                onClick={() => updatePlayerDetails()}
                loading={updatingPlayer}
              >
                <label htmlFor="">submit</label>
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PlayerDeatilsPage;
