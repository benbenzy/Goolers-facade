'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import { CaptainFormPost, TeamFormPost } from '@/app/types/types.d';
import { createClient } from '@/utils/supabase/client';
import { TablesInsert } from '@/database.types';
import AddCaptainForm from '@/app/ui/dashboard/Captains/AddCaptainForm';

function AddCaptainPage() {
  const supabase = createClient();
  const handleCreateCaptain: SubmitHandler<CaptainFormPost> = (data: any) => {
    createCaptain({ newUser: data });
  };

  const {
    mutate: createCaptain,
    isError: createCaptainError,
    isPending: createCaptainProgress,
    isSuccess: createCaptainSuccess,
    error,
  } = useMutation({
    mutationFn: async ({ newUser }: { newUser: TablesInsert<'captains'> }) => {
      console.log('new plan', newUser);
      const { error } = await supabase
        .from('captains')
        .insert({ player_id: newUser.player_id, team_id: newUser.team_id });
      if (error) {
        console.log('failed to insert into teams', error.message);
      }
    },
    onSuccess: () => {},
  });

  return (
    <div className="bg-slate-800">
      {createCaptainError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to create {error.message}</span>
          </div>
        </div>
      )}
      {createCaptainProgress && (
        <progress className="progress w-56">creating course</progress>
      )}
      {createCaptainSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>plan created </span>
          </div>
        </div>
      )}
      <AddCaptainForm submit={handleCreateCaptain} />
    </div>
  );
}

export default AddCaptainPage;
