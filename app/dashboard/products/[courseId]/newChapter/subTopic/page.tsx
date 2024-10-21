'use client';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { Suspense, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
type subTopicFormPost = {
  id: string;
  title: string;
  content: string;
  chapterId: string;
  courseId: string;
};
type SubTopic = {
  id: string;
  title: string;
  content: string;
  chapterId: string;
  courseId: string;
};

const NewSubTopic = () => {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const subTopicId = searchParams.get('subTopicId');
  const chapterId = searchParams.get('chapterId');
  const requestType = searchParams.get('requestType');
  const { register, handleSubmit } = useForm<subTopicFormPost>();
  const [subTopic, setSubTopic] = useState<SubTopic>({
    id: '',
    title: '',
    content: '',
    chapterId: '',
    courseId: '',
  });
  // const { data: courseChapter } = useQuery<Chapter>({
  //   queryKey: ['courseChapter', courseId],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       `/api/courses/${courseId}/chapters/${chapterId}`
  //     );
  //     return res.data;
  //   },
  // });
  useEffect(() => {
    const unsub = async () => {
      if (requestType === 'edit') {
        const { data, error } = await supabase
          .from('sub_topics')
          .select('*')
          .eq('id', subTopicId)
          .single();
        if (error) {
          console.log('error loading subTopic');
        }

        setSubTopic(data);
      } else if (requestType === 'create') {
        if (chapterId) {
          setSubTopic({
            title: '',
            content: '',
            chapterId: chapterId,
            id: '',
            courseId: '',
          });
        }
      }
    };
    unsub();
  }, [requestType]);
  const handleeditCourseChapter: SubmitHandler<subTopicFormPost> | any = (
    data: any
  ) => {
    editChapter(data);
  };

  const {
    mutate: editChapter,
    isError: editChapterError,
    isPending: editChapterProgress,
    isSuccess: editChapterSuccess,
    error: editError,
  } = useMutation({
    mutationFn: async (newChapter: any) => {
      const { data, error } = await supabase
        .from('sub_topics')
        .update({ title: newChapter?.title, content: newChapter?.content })
        .eq('id', subTopicId)
        .select();
      if (error) {
        throw new Error('failed to update ');
      }
      return data;
    },
  });

  const {
    mutate: createChapter,
    isError: createChapterError,
    isPending: createChapterProgress,
    isSuccess: createChapterSuccess,
    error,
  } = useMutation({
    mutationFn: async (newChapter: any) => {
      const { data, error } = await supabase
        .from('sub_topics')
        .insert({
          title: newChapter?.title,
          content: newChapter?.content,
          chapter_id: newChapter?.chapterId,
        })
        .select('*');
      if (error) {
        throw new Error('failed to create chapter');
      }
      return data;
    },
    onSuccess: () => {
      setSubTopic({
        title: '',
        content: '',
        chapterId: `${chapterId}`,
        id: '',
        courseId: '',
      });
    },
  });

  const handleCreateCourseChapter: SubmitHandler<subTopicFormPost> | any = (
    data: any
  ) => {
    createChapter(data);
  };
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
            {...register('chapterId')}
            type="text"
            value={chapterId ?? ''}
            placeholder="chapterId"
            className="input input-bordered w-full text-slate-900 hidden"
          />
          <input
            {...register('courseId')}
            type="text"
            value={courseId ?? ''}
            placeholder="courseId"
            className="input input-bordered w-full text-slate-900 hidden"
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
            {...register('content')}
            value={subTopic?.content}
            onChange={(e) => {
              setSubTopic({ ...subTopic, content: e.target.value });
            }}
            rows={10}
            placeholder="body content"
            className="textarea textarea-bordered textarea-lg w-full  dark:bg-slate-800 dark:text-slate-100 text-slate-900"
          ></textarea>
        </label>

        {createChapterError && (
          <div className="toast">
            <div className="alert alert-error">
              <span>failed to create {error.message}</span>
            </div>
          </div>
        )}
        {createChapterProgress && (
          <progress className="progress w-56">updating chapter...</progress>
        )}
        {createChapterSuccess && (
          <div className="toast">
            <div className="alert alert-success">
              <span>chapter updated</span>
            </div>
          </div>
        )}
        {editChapterError && (
          <div className="toast">
            <div className="alert alert-error">
              <span>failed to update chapter</span>
            </div>
          </div>
        )}
        {editChapterProgress && (
          <div className="toast">
            <div className="alert alert-success">
              <span>submitting update ... </span>
            </div>
          </div>
        )}
        {editChapterSuccess && (
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
            handleSubmit(handleeditCourseChapter(subTopic));
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
            handleSubmit(handleCreateCourseChapter(subTopic));
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

export default NewSubTopic;
