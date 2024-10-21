'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

function TeamForm() {
  const { register, handleSubmit } = useForm();
  const {
    data: teams,
    isLoading: loadingTeams,
    isError: teamLoadingError,
  } = useQuery<any>({
    queryKey: ['teams'],
    queryFn: async () => {
      const res = await axios.get('/api/teams');
      return res.data;
    },
  });
  return (
    <form action="submit">
      <input />
    </form>
  );
}

export default TeamForm;
