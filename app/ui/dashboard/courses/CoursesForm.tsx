'use client';
import { CourseFormPost } from '@/app/types/types.d';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface props {
  submit: SubmitHandler<CourseFormPost>;
  isEditting: Boolean;
}

const CoursesForm: FC<props> = ({ submit, isEditting }) => {
  const { register, handleSubmit } = useForm<CourseFormPost>();
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await axios.get('/api/categories');
      return res.data;
    },
  });

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className=" w-full gap-2 dark:text-slate-100"
    >
      <div className="w-full flex flex-row md:flex-row sm:flex-col gap-5 items-center">
        <input
          type="text"
          placeholder="name"
          required
          className=" w-11s h-8 text-slate-900 rounded-md  dark:text-slate-100 dark:bg-slate-700"
          {...register('title')}
        />
        <input
          type="number"
          placeholder="budget"
          min={0}
          {...register('price')}
          className="text-slate-900 rounded-md w-11s h-8 dark:text-slate-100 dark:bg-slate-700"
        />
        <input
          type="date"
          placeholder="start-date"
          {...register('course_duration')}
          className="text-slate-900 rounded-md w-11s h-8  dark:bg-slate-700 dark:text-slate-100"
        />
        <input
          type="date"
          placeholder="end-date"
          {...register('course_duration')}
          className="text-slate-900 rounded-md w-11s h-8  dark:bg-slate-700 dark:text-slate-100"
        />
        {categoriesLoading ? (
          <div>category</div>
        ) : (
          <select
            {...register('category_id')}
            id="cat"
            className="p-2 bg-slate-500 rounded-md text-slate-200 mb-5 mt-5"
          >
            <option>select category</option>
            {categories?.map((item: any) => (
              <option value={item?.id} key={item?.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="gap-5 dark:text-slate-100">
        <textarea
          {...register('audience')}
          placeholder="people addicted to masurbation #people with trauma"
          className="text-slate-900 rounded-md w-full  dark:bg-slate-700 dark:text-slate-100"
        />

        <textarea
          className="w-full text-slate-950 rounded-lg  dark:bg-slate-700  dark:text-slate-100"
          {...register('description')}
          placeholder="description"
          rows={10}
        ></textarea>
      </div>

      <button
        type="submit"
        className="p-5 w-full bg-blue-500 rounded-lg border-none mt-4 mb-4"
      >
        Submit
      </button>
    </form>
  );
};

export default CoursesForm;
