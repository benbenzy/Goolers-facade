'use client';

import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import CoursesForm from '@/app/ui/dashboard/courses/CoursesForm';
import { CourseFormPost, LeagueFormPost } from '@/app/types/types.d';
import AddLeagueForm from '@/app/ui/dashboard/Leagues/AddLeagueForm';
import { createClient } from '@/utils/supabase/client';
import { Tables, TablesInsert } from '@/database.types';

function AddLeague() {
  const supabase = createClient();
  const handleCreateCourse: SubmitHandler<LeagueFormPost> = (data: any) => {
    createCourse({ newPlan: data });
  };

  const {
    mutate: createCourse,
    isError: createCourseError,
    isPending: createCourseProgress,
    isSuccess: createCourseSuccess,
    error,
  } = useMutation({
    mutationFn: async ({ newPlan }: { newPlan: TablesInsert<'leagues'> }) => {
      console.log('new plan', newPlan);
      const { error } = await supabase.from('leagues').insert({ ...newPlan });
      if (error) {
        console.log('failed to insert into leagues', error.message);
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
      <AddLeagueForm submit={handleCreateCourse} />
    </div>
  );
}

export default AddLeague;
