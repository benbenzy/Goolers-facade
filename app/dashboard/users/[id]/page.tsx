'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { createClient } from '@/utils/supabase/client';
import RemoteImage from '@/app/ui/dashboard/remoteImage/RemoteImage';
export interface UserProps {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at?: Date | undefined;
  group: string;
  avatar_url: string;
  isMember: boolean;
  isActive: boolean;
}
const Card = (item: any) => {
  return (
    <div className="card bg-primary text-primary-content w-96">
      <div className="card-body">
        <h2 className="card-title">{item?.tite}</h2>
        <p>{item?.subTitle}</p>
      </div>
    </div>
  );
};

function SingleUserPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const [image, setImage] = useState<File | null | any>(null);
  const [uploading, setUploading] = useState(false);

  const [user, setUser] = useState<UserProps>({
    id: '',
    full_name: '',
    email: '',
    phone: '',
    group: '',
    avatar_url: '',
    isMember: false,
    isActive: false,
  });
  const imageRef = useRef<any>(null);
  const { data: UserData } = useQuery({
    queryKey: ['getUser'],
    queryFn: async () => {
      const user = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      return user.data;
    },
  });
  useEffect(() => {
    setUser(UserData);
  }, [UserData]);

  async function uploadImage(image: any) {
    setUploading(true);
    const fileExt = image?.name?.split('.').pop();
    const filePath = `${user?.id}-${Math.random()}.${fileExt}`;
    if (!user.avatar_url) {
      const { error, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, image);
      if (error) {
        setImage(null);
        setUploading(false);
        console.log('failed get bucket', error);
      }
      if (!error) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .update({ avatar_url: data.path })
          .eq('id', userId);
        console.log('updated');
        setImage(null);
        setUploading(false);
        if (userError) {
          setImage(null);
          setUploading(false);
          console.log('failed to update user', userError);
        }
      }
    } else {
      const { error, data } = await supabase.storage
        .from('avatars')
        .update(user.avatar_url, image);
      if (!error) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .update({ avatar_url: data.path })
          .eq('id', userId);
        setImage(null);
        setUploading(false);
        console.log('updated', userData);
        if (userError) {
          setImage(null);
          setUploading(false);
          console.log('failed to update user', userError);
        }
      }
    }
  }
  const DisplayCard = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <div className="card bg-primary text-neutral-content w-60 mt-5 ">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn">open</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-row gap-8">
        <div className="flex flex-col w-2/5 mt-5 bg-slate-800 p-5">
          <div className="w-full h-3/4 mb-5 overflow-hidden rounded-md relative">
            <RemoteImage
              onClick={() => imageRef?.current?.click()}
              fill={true}
              path={user?.avatar_url}
              size={200}
              fallback="/noavatar.png"
              bucket="avatars"
              alt="/noavatar.png"
              className={'max-w-48 max-h-70 rounded-lg'}
              uploadImage={image}
              cancelled={!image}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => setImage(e?.target?.files[0])}
            ref={imageRef}
            hidden
          />
          {image && (
            <div>
              {uploading ? (
                <div className="bg-green-500">uploading...</div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-green-500"
                    onClick={() => uploadImage(image)}
                  >
                    upload
                  </button>
                  <button
                    className="bg-slate-400"
                    onClick={() => {
                      setImage(null);
                    }}
                  >
                    cancel
                  </button>
                </div>
              )}
            </div>
          )}
          <div>
            <div>Name: {UserData?.full_name}</div>
            <div>Email: {UserData?.email}</div>
            <div>Phone: {UserData?.phone}</div>
            <div>Role: {UserData?.group}</div>
          </div>
        </div>
        <div className=" flex-1 gap-2 mt-2 rounded-md bg-slate-800">
          <form action="" className="flex flex-col">
            <label htmlFor="lastName" className="mt-5 font-semibold capitalize">
              {' '}
              Name
            </label>
            <input
              className="bg-slate-600 p-2 rounded-md text-slate-50"
              value={user?.full_name}
              onChange={(e) => setUser({ ...user, full_name: e.target.value })}
              type="text"
              placeholder="lastName"
              name="lastName"
            />
            <label htmlFor="email" className="mt-2 font-semibold capitalize">
              Email
            </label>
            <input
              className="bg-slate-600 p-2 rounded-md text-slate-50"
              type="email"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              name="email"
            />
            <label htmlFor="email" className="mt-2 font-semibold capitalize">
              {' '}
              Phone
            </label>
            <input
              className="bg-slate-600 p-2 rounded-md text-slate-50"
              type="tel"
              value={user?.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              name="phone"
            />

            <label htmlFor="email" className="mt-2 font-semibold capitalize">
              Role
            </label>
            <select
              name="role"
              id=""
              value={user?.group}
              onChange={(e) => setUser({ ...user, group: e.target.value })}
              className="bg-slate-600 p-2 rounded-md text-slate-50"
            >
              <option value={'ADMIN'}>ADMIN</option>
              <option value={'AUTHOR'}>AUTHOR</option>
              <option value={'CUSTOMER_SUPPORT'}>SUPPORT</option>
              <option value={'MARKETTING'}>MARKETTING</option>
              <option value={'SALES'}>SALES</option>
              <option value={'FINANCE'}>FINANCE</option>
              <option value={'RESEARCH'}> RESEARCH</option>
              <option value={'PUBLISHERS'}>PUBLISHERS</option>
              <option value={'EDITOR'}>EDITOR</option>
              <option value={'AGENT'}>AGENT</option>
              <option value={'TEST'}>TEST</option>
            </select>
            <label htmlFor="email" className="mt-2 font-semibold capitalize">
              status
            </label>

            <select
              name="status"
              id=""
              onChange={(e: any) =>
                setUser({
                  ...user,
                  isActive: e.target.value,
                })
              }
              className="bg-slate-600 p-2 rounded-md text-slate-50"
            >
              <option>active</option>
              <option>block</option>
            </select>
            <button className="w-full bg-green-900 rounded-md mt-5 p-2"></button>
          </form>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <DisplayCard title="Purchases" description="Ksh 300" />{' '}
        <DisplayCard title="Purchases" description="Ksh 300" />{' '}
        <DisplayCard title="Purchases" description="Ksh 300" />
      </div>
    </div>
  );
}

export default SingleUserPage;
