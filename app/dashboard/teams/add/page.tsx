'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import { TeamFormPost } from '@/app/types/types.d';
import { createClient } from '@/utils/supabase/client';
import { TablesInsert } from '@/database.types';
import AddTeamForm from '@/app/ui/dashboard/Teams/AddTeamForm';

function AddTeamPage() {
  const supabase = createClient();
  const handleCreateTeam: SubmitHandler<TeamFormPost> = (data: any) => {
    createTeam({ newTeam: data });
  };

  const {
    mutate: createTeam,
    isError: createCourseError,
    isPending: createCourseProgress,
    isSuccess: createCourseSuccess,
    error,
  } = useMutation({
    mutationFn: async ({ newTeam }: { newTeam: TablesInsert<'teams'> }) => {
      console.log('new plan', newTeam);
      const { error } = await supabase.from('teams').insert({ ...newTeam });
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
            <span>plan created </span>
          </div>
        </div>
      )}
      <AddTeamForm submit={handleCreateTeam} />
    </div>
  );
}

export default AddTeamPage;
