'use client';
import { UserFormPost } from '@/app/types/types.d';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
interface FormProps {
  submit: SubmitHandler<UserFormPost>;
  isEditting: Boolean;
}

const UserForm: FC<FormProps> = ({ submit, isEditting }) => {
  const { register, handleSubmit } = useForm<UserFormPost>();

  return (
    <form
      className="grid grid-cols-2  gap-5 m-5 items-center text-slate-900"
      onSubmit={handleSubmit(submit)}
    >
      <input
        {...register('firstName')}
        type="text"
        placeholder="firstName"
        className="w-full max-w-xs input-bordered p-2 rounded-lg "
      />
      <input
        {...register('lastName')}
        type="text"
        placeholder="lastName"
        className="w-full max-w-xs input-bordered p-2 rounded-lg"
      />
      <input
        {...register('email')}
        type="email"
        placeholder="email"
        className="w-full max-w-xs input-bordered p-2 rounded-lg "
      />

      <input
        {...register('phone')}
        type="tel"
        placeholder="phone"
        className="w-full max-w-xs input-bordered p-2 rounded-lg "
      />
      <select
        {...register('role')}
        className="w-full max-w-xs input-bordered p-2 rounded-lg "
        id=""
      >
        <option value="">select role</option>
        <option value="ADMIN">admin</option>
        <option value="AUTHOR">author</option>
        <option value="CUSTOMER_SUPPORT">support</option>
        <option value="MARKETTING">marketting</option>
        <option value="SALES">SALES</option>
        <option value="FINANCE">FINANCE</option>
        <option value="RESEARCH"> RESEARCH</option>
        <option value="PUBLISHERS">PUBLISHERS</option>
        <option value="EDITOR">EDiTOR</option>
        <option value="AGENT">AGENT</option>
      </select>

      <button
        className="btn w-1/2 bg-blue-400 mt-5 p-5  rounded-xl hover:bg-blue-100"
        type="submit"
      >
        submit
      </button>
    </form>
  );
};

export default UserForm;
