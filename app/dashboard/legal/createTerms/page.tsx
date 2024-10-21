'use client';
import { createClient } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';

type termsFormPost = {
  id: string;
  category: string;
  title: string;
  message: string;
};
type Terms = {
  id: string;
  title: string;
  message: string;
  category: string;
};
const CreateTermsForm = () => {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const requestType = searchParams.get('requestType');
  const category = searchParams.get('category');
  const { register, handleSubmit } = useForm<termsFormPost>();
  const [subTopic, setSubTopic] = useState<Terms>({
    id: '',
    title: '',
    message: '',
    category: category ?? '',
  });
  const handleEditTerms: any = (item: any) => {
    editTerms(item);
  };
  const handleCreateTerms: any = (data: any) => {
    createTerms(data);
  };
  const {
    mutate: createTerms,
    isError: createTermsError,
    isPending: createTermsPending,
    isSuccess: createTermsSuccess,
  } = useMutation({
    mutationFn: async (data: any) => {
      const { data: success, error } = await supabase.from('terms').insert({
        title: data.title,
        category: data.category,
        message: data.message,
      });
      if (error) {
        console.log('failed to insert', error.message);
      }
      return success;
    },
    onSuccess: () => {
      setSubTopic({ id: '', title: '', message: '', category: category ?? '' });
    },
  });
  const {
    mutate: editTerms,
    isError: editTermsError,
    isPending: editTermsPending,
    isSuccess: editTermsSuccess,
  } = useMutation({ mutationFn: async () => {} });
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text text-slate-100">title?</span>
          </div>
          <input
            {...register('id')}
            type="text"
            value={subTopic?.id}
            placeholder="id"
            className="input input-bordered w-full text-slate-900  hidden"
          />

          <input
            {...register('title')}
            value={subTopic?.title}
            onChange={(e) => {
              setSubTopic({ ...subTopic, title: e.target.value });
            }}
            type="text"
            placeholder="title"
            className="input input-bordered w-full dark:bg-slate-800 dark:text-slate-100 text-slate-900"
          />
        </label>

        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text text-slate-100">body</span>
          </div>
          <textarea
            {...register('message')}
            value={subTopic?.message}
            onChange={(e) => {
              setSubTopic({ ...subTopic, message: e.target.value });
            }}
            rows={10}
            placeholder="body content"
            className="textarea textarea-bordered textarea-lg w-full  dark:bg-slate-800 dark:text-slate-100 text-slate-900"
          ></textarea>
        </label>

        {createTermsError && (
          <div className="toast">
            <div className="alert alert-error">
              <span>failed to create </span>
            </div>
          </div>
        )}
        {createTermsPending && (
          <progress className="progress w-56">submit progress...</progress>
        )}
        {createTermsSuccess && (
          <div className="toast">
            <div className="alert alert-success">
              <span>terms created</span>
            </div>
          </div>
        )}
        {editTermsError && (
          <div className="toast">
            <div className="alert alert-error">
              <span>failed to update chapter</span>
            </div>
          </div>
        )}
        {editTermsPending && (
          <div className="toast">
            <div className="alert alert-success">
              <span>submitting update ... </span>
            </div>
          </div>
        )}
        {editTermsSuccess && (
          <div className="toast">
            <div className="alert alert-success">
              <span>chapter updated </span>
            </div>
          </div>
        )}
      </form>
      {requestType === 'edit' && (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(handleEditTerms(subTopic));
          }}
          type="submit"
          className="btn btn-success w-full mt-5"
        >
          update
        </button>
      )}
      {requestType === 'create' && (
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(handleCreateTerms(subTopic));
          }}
          type="submit"
          className="btn btn-success w-full mt-5"
        >
          save
        </button>
      )}
    </div>
  );
};

function CreateTermsPage() {
  return (
    <Suspense>
      <CreateTermsForm />
    </Suspense>
  );
}

export default CreateTermsPage;
