'use client';

import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

function NewLeagueTeamPage() {
  const queryClient = useQueryClient();
  const supabase = createClient();
  const pathname = usePathname();
  const idlength = pathname.split('/');
  const id = idlength[idlength.length - 2];
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
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
  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams_select'],
    queryFn: async () => {
      const { data: added } = await supabase
        .from('league_teams')
        .select('*')
        .eq('league_id', id);
      const addedTeamsIds = added?.map((item) => item?.team_id);
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('county', league?.county)
        .eq('sub_county', league.sub_county)
        .eq('ward_id', league?.wards?.id)
        .not('id', 'in', `(${addedTeamsIds?.join(',')})`);
      if (error) {
        console.log('failed to load teams', error.message);
      }
      return data;
    },
    enabled: !!league,
  });
  function handleSelect(value: string) {
    setSelectedTeams((prevSelectedOptions) => {
      // If the option is already selected, remove it, otherwise add it
      if (prevSelectedOptions.includes(value)) {
        return prevSelectedOptions.filter((item) => item !== value);
      } else {
        return [...prevSelectedOptions, value];
      }
    });
    console.log('all items', selectedTeams);
  }
  const {
    mutate: handleSubmitTeams,
    isPending: addingTeam,
    isError: addTeamError,
    isSuccess: addTeamSuccess,
  } = useMutation({
    mutationFn: async (team_id: string) => {
      const { data, error } = await supabase
        .from('league_teams')
        .insert({ team_id: team_id, league_id: id });
      if (error) {
        console.log('failed to insert teams into league', error.message);
      }
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['teams_select'] }),
  });

  return (
    <div>
      {addTeamSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>terms created</span>
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
      {teamsLoading ? (
        <div>Team</div>
      ) : (
        <div className=" ">
          <label htmlFor="">Team</label>

          {Array.isArray(teams) &&
            teams?.map((item: any) => (
              <div key={item?.id} className="form-control">
                <label className="label  p-2 cursor-pointer">
                  <div className="flex flex-row gap-5 items-center">
                    <input
                      onChange={(e) => handleSelect(e.target.value)}
                      type="checkbox"
                      value={item?.id}
                      checked={selectedTeams?.includes(item?.id)}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text">{item?.name}</span>
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

export default NewLeagueTeamPage;
