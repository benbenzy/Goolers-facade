'use client';

import React from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler } from 'react-hook-form';
import CoursesForm from '@/app/ui/dashboard/courses/CoursesForm';
import { CourseFormPost } from '@/app/types/types.d';

function AddProductspage() {
  const handleCreateCourse: SubmitHandler<CourseFormPost> = (data: any) => {
    createCourse(data);
  };

  const {
    mutate: createCourse,
    isError: createCourseError,
    isPending: createCourseProgress,
    isSuccess: createCourseSuccess,
    error,
  } = useMutation({
    mutationFn: async (newPlan) => {
      await axios.post('/api/courses', newPlan);
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
      <CoursesForm submit={handleCreateCourse} isEditting={false} />
    </div>
  );
}

export default AddProductspage;
