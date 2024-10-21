'use client';
import { supabase } from '@/utils/supabase';
import Image, { getImageProps, ImageProps } from 'next/image';
import React, { ComponentProps, useEffect, useState } from 'react';
type imageProps = {
  path: string;
  fallback: string;
  bucket: string;
  className: ImageProps['style'];
  size: number;
  uploadImage?: File;
  cancelled?: boolean;
} & Omit<ComponentProps<typeof Image>, 'src'>;

function RemoteImage({
  path,
  fallback,
  className,
  bucket,
  size,
  onClick,
  uploadImage,
  cancelled,
}: imageProps) {
  const [image, setImage] = useState('');
  const [imageToUpload, setImageToUpload] = useState('');
  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from(bucket)
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setImage(url);
      } catch (error) {
        console.log('Error downloading image: ', error);
      }
    }

    if (path) downloadImage(path);
  }, [path]);
  useEffect(() => {
    const unsub = () => {
      if (uploadImage) {
        setImageToUpload(URL.createObjectURL(uploadImage));
      }
      if (cancelled) {
        setImageToUpload('');
      }
    };
    unsub();
  }, [uploadImage]);

  return (
    <div className="flex flex-row gap-2">
      <Image
        onClick={onClick}
        alt=""
        src={image || fallback}
        width={size}
        height={size}
        className={`${className}`}
      />
      {imageToUpload != '' && (
        <Image
          alt=""
          src={imageToUpload || fallback}
          width={size}
          height={size}
          className={`${className}`}
        />
      )}
    </div>
  );
}

export default RemoteImage;
