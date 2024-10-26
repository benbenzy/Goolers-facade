'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import {
  CaptainFormPost,
  TeamFormPost,
  VenueFormPost,
} from '@/app/types/types.d';
import { createClient } from '@/utils/supabase/client';
import { TablesInsert } from '@/database.types';
import AddVenueForm from '@/app/ui/dashboard/Venues/AddVenuesForm';

function AddVenuePage() {
  const supabase = createClient();
  const handleCreateCaptain: SubmitHandler<VenueFormPost> = (data: any) => {
    createCaptain({ newVenue: data });
  };

  const {
    mutate: createCaptain,
    isError: createCaptainError,
    isPending: createCaptainProgress,
    isSuccess: createCaptainSuccess,
    error,
  } = useMutation({
    mutationFn: async ({ newVenue }: { newVenue: TablesInsert<'venues'> }) => {
      console.log('new plan', newVenue);
      const { error } = await supabase.from('venues').insert({ ...newVenue });
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
      <AddVenueForm submit={handleCreateCaptain} />
    </div>
  );
}

export default AddVenuePage;
