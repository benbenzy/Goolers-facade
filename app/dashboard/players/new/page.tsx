'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import { PlayerFormPost, TeamFormPost } from '@/app/types/types.d';
import { createClient } from '@/utils/supabase/client';
import { TablesInsert } from '@/database.types';
import AddTeamForm from '@/app/ui/dashboard/Teams/AddTeamForm';
import AddPlayerForm from '@/app/ui/dashboard/players/AddPlayerForm';

function NewPlayerPage() {
  const supabase = createClient();
  const handleCreateTeam: SubmitHandler<PlayerFormPost> = (data: any) => {
    createTeam({ newPlayer: data });
  };

  const {
    mutate: createTeam,
    isError: createCourseError,
    isPending: createCourseProgress,
    isSuccess: createCourseSuccess,
    error,
  } = useMutation({
    mutationFn: async ({ newPlayer }: { newPlayer: TablesInsert<'teams'> }) => {
      console.log('new player', newPlayer);
      const { error } = await supabase.from('players').insert({ ...newPlayer });
      if (error) {
        console.log('failed to insert into teams', error.message);
      }
    },
    onSuccess: () => {},
  });

  return (
    <div className="bg-slate-800">
      {createCourseError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to create {error.message}</span>
          </div>
        </div>
      )}
      {createCourseProgress && (
        <progress className="progress w-56">creating course</progress>
      )}
      {createCourseSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>player created </span>
          </div>
        </div>
      )}
      <AddPlayerForm submit={handleCreateTeam} />
    </div>
  );
}

export default NewPlayerPage;
