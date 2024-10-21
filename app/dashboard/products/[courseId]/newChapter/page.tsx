'use client';
import { ActionButton } from '@/app/ui/dashboard/ActionButton/ActionButton';
import { createClient } from '@/utils/supabase/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  MdBorderColor,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDelete,
  MdMoreVert,
} from 'react-icons/md';
type ChapterFormPost = {
  id: string;
  title: string;
  content: string;
  courseId: string;
};

const NewChapterPage = () => {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const chapterId = searchParams.get('chapterId');
  const requestType = searchParams.get('requestType');
  const [selectedChapter, setSelectedChapter] = useState('');
  const { register, handleSubmit } = useForm<ChapterFormPost | any>();
  const [chapter, setChapter] = useState<any>({
    id: '',
    title: '',
    content: '',
    courseID: '',
    sub_topis: [],
  });

  useEffect(() => {
    const unsub = async () => {
      if (requestType === 'edit') {
        const { data, error } = await supabase
          .from('chapters')
          .select('*,sub_topics(*)')
          .eq('id', chapterId)
          .single();
        if (error) {
          console.log('error loading chapter');
        }
        setChapter(data);
      } else if (requestType === 'create') {
        if (courseId) {
          setChapter({
            title: '',
            content: '',
            courseID: courseId,
            id: '',
            sub_topis: [],
          });
        }
      }
    };
    unsub();
  }, [requestType]);
  const handleeditCourseChapter: any = (data: any) => {
    editChapter(data);
  };

  const {
    mutate: editChapter,
    isError: editChapterError,
    isPending: editChapterProgress,
    isSuccess: editChapterSuccess,
  } = useMutation({
    mutationFn: async (newChapter) => {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        newChapter
      );
    },
  });

  const {
    mutate: createChapter,
    isError: createChapterError,
    isPending: createChapterProgress,
    isSuccess: createChapterSuccess,
    error,
  } = useMutation({
    mutationFn: async (newChapter) => {
      await axios.post(`/api/courses/${courseId}/chapters`, newChapter);
    },
  });

  const handleCreateCourseChapter: any = (data: any) => {
    createChapter(data);
  };
  const actions = [
    {
      name: 'edit',
      icon: <MdBorderColor />,
      pathname: `/dashboard/products/${courseId}/newChapter/subTopic`,
      query: {
        requestType: 'edit',
        courseId: courseId,
        chapterId: chapterId,
        subTopicId: selectedChapter,
      },
    },
  ];
  const handleDelete = () => {
    deleteItem();
  };
  const {
    mutate: deleteItem,
    isPending: deleteChapterProgress,
    isSuccess: deleteChapterSuccess,
    isError: deleteChapterError,
  } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/subTopics/${selectedChapter}`
      );
    },
  });

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className="form-control w-full ">
          <div className="label flex flex-row">
            <span className="label-text capitalize text-slate-100">
              {chapter?.title}
            </span>
            <Link
              href={{
                pathname: `/dashboard/products/${chapterId}/newChapter/subTopic`,
                query: { chapterId: chapterId, requestType: 'create' },
              }}
            >
              <button className="btn btn-neutral">add subTopic</button>
            </Link>
          </div>
        </label>

        <div>
          <table className="w-full">
            <thead>
              <tr>
                <td>title</td> <td>createdAt</td> <td>reviewed</td>
                <td>completed</td> <td>actions</td>
              </tr>
            </thead>
            <tbody>
              {chapter?.sub_topics?.map((item: any) => (
                <tr key={item.id}>
                  <td>
                    <div>{item?.title}</div>
                  </td>
                  <td>{new Date(item?.created_at).toDateString()}</td>
                  <td>
                    <div>
                      {item?.published ? (
                        <MdCheckBox />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </div>
                  </td>

                  <td>
                    <div>{item?.published ? 'reviwed' : 'complete'}</div>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        selectedChapter == item?.id
                          ? setSelectedChapter('')
                          : setSelectedChapter(item.id);
                      }}
                    >
                      <MdMoreVert />
                    </button>
                    {selectedChapter == item.id && (
                      <div className="flex flex-col gap-1 absolute bg-slate-700">
                        {actions.map((item) => {
                          return (
                            <ActionButton
                              key={item.name}
                              pathname={item.pathname}
                              icon={item.icon}
                              query={item.query}
                              name={item.name}
                            />
                          );
                        })}
                        <button
                          onClick={() => handleDelete()}
                          className="flex flex-row text-red-500 items-center gap-1 hover:bg-slate-400 hover:cursor-pointer"
                        >
                          <MdDelete />
                          delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {createChapterError && (
          <div className="toast">
            <div className="alert alert-error">
              <span>failed to create {error.message}</span>
            </div>
          </div>
        )}
        {createChapterProgress && (
          <div className="toast">
            <div className="alert alert-success">
              <progress className="progress w-56">updating chapter...</progress>
              <span>updating ...</span>
            </div>
          </div>
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
        {deleteChapterError && (
          <div className="toast">
            <div className="alert alert-error">
              <span>failed to delete {error?.message}</span>
            </div>
          </div>
        )}
        {deleteChapterProgress && (
          <div className="toast">
            <div className="alert alert-success">
              <progress className="progress w-56">deleting ...</progress>
              <span>deleting ...</span>
            </div>
          </div>
        )}
        {deleteChapterSuccess && (
          <div className="toast">
            <div className="alert alert-success">
              <span>chapter deleted</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewChapterPage;
