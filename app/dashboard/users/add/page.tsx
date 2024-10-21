'use client';
import { UserFormPost } from '@/app/types/types.d';
import UserForm from '@/app/ui/dashboard/users/UserForm';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

function AddUserPage() {
  const createUser: SubmitHandler<UserFormPost> = (data: any) => {
    createUserMutation(data);
  };
  const {
    mutate: createUserMutation,
    isError: createUserError,
    isPending: createUserProgress,
    isSuccess: createUserSuccess,
    error,
  } = useMutation({
    mutationFn: async (newUser) => await axios.post('/api/users', newUser),
  });

  return (
    <div>
      {createUserError && (
        <div className="toast">
          <div className="alert alert-error">
            <span>failed to create {error.message}</span>
          </div>
        </div>
      )}
      {createUserProgress && (
        <progress className="progress bg-slate-100 w-56">
          creating user
        </progress>
      )}
      {createUserSuccess && (
        <div className="toast">
          <div className="alert alert-success">
            <span>user created </span>
          </div>
        </div>
      )}
      <UserForm isEditting={false} submit={createUser} />
    </div>
  );
}

export default AddUserPage;
