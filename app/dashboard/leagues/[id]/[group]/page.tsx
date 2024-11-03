'use client';

import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

function NewGroupPage() {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const pathname = usePathname();
  const idlength = pathname.split('/');
  const id = idlength[idlength.length - 2];
  const group_id = pathname.split('/').pop();
  //const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const { data: league } = useQuery({
    queryKey: ['league', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leagues')
        .select('*,wards(*)')
        .eq('id', id)
        .single();
      if (error) {
        console.log('failed to load league details', error.message);
      }
      return data;
    },
    enabled: !!id,
  });
  const { data: Addteams, isLoading: AddteamsLoading } = useQuery({
    queryKey: ['group_teams', group_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('league_teams')
        .select('*,teams(*)')
        .eq('league_group', group_id);

      if (error) {
        console.log('failed to load teams in group', error.message);
      }
      return data;
    },
    enabled: !!league,
  });
  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['group_teams', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('league_teams')
        .select('*,teams(*)')
        .eq('league_id', id)
        .eq('grouped', false);
      if (error) {
        console.log('failed to load teams in league', error.message);
      }
      return data;
    },
    enabled: !!league,
  });
  // function handleSelect(value: string) {
  //   setSelectedTeams((prevSelectedOptions) => {
  //     // If the option is already selected, remove it, otherwise add it
  //     if (prevSelectedOptions.includes(value)) {
  //       return prevSelectedOptions.filter((item) => item !== value);
  //     } else {
  //       return [...prevSelectedOptions, value];
  //     }
  //   });
  //   console.log('all items', selectedTeams);
  // }
  const {
    mutate: handleSubmitTeams,
    isPending: addingTeam,
    isError: addTeamError,
    isSuccess: addTeamSuccess,
  } = useMutation({
    mutationFn: async (team_id: string) => {
      const { data, error } = await supabase
        .from('league_teams')
        .update({ league_group: group_id, grouped: true, reviewed: true })
        .eq('id', team_id);
      if (error) {
        console.log('failed to update  league teams', error.message);
      }
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['group_teams'] }),
  });
  const { mutate: handleRemoveFromGroup } = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('league_teams')
        .update({ league_group: null, grouped: false, reviewed: false })
        .eq('id', id);
      if (error) {
        console.log('failed to update  league teams', error.message);
      }
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['group_teams'] }),
  });

  return (
    <div>
      {addTeamSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>team created</span>
          </div>
        </div>
      )}
      {addTeamError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to add</span>
          </div>
        </div>
      )}
      {addingTeam && <progress className="progress w-56"></progress>}
      <div className="flex flex-row justify-between m-5">
        <div className=" font-bold uppercase underline">Group Teams</div>
      </div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th> <th>createdAt</th> <th>teams</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {Addteams?.map((item: any, index: number) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <div>{item?.teams?.name}</div>
              </td>
              <td>
                <div>{new Date(item?.created_at).toDateString()}</div>
              </td>
              <td>lenth</td>

              <td>
                <div className="flex flex-row items-center gap-5">
                  <Link
                    className="btn btn-success"
                    href={`/dashboard/leagues/${id}/${item.id}`}
                  >
                    open
                  </Link>
                  <button
                    className="btn btn-error"
                    onClick={() => {
                      const text = 'do you want to remove item';
                      if (confirm(text) === true) {
                        handleRemoveFromGroup(item?.id);
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
      {teamsLoading ? (
        <div>Team</div>
      ) : (
        <div className=" ">
          <label htmlFor="">League Team</label>

          {Array.isArray(teams) &&
            teams?.map((item: any, index) => (
              <div key={item?.id} className="form-control">
                <label className="label  p-2 cursor-pointer">
                  <div className="flex flex-row gap-5 items-center">
                    <span className="label">{index + 1}</span>
                    <span className="label-text">{item?.teams?.name}</span>
                  </div>
                  <button
                    onClick={() => handleSubmitTeams(item.id)}
                    className="btn btn-outline btn-primary "
                  >
                    add
                  </button>
                </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default NewGroupPage;
