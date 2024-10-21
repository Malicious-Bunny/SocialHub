'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type TImageWithFallbackProps = {
  alt: string;
  src: string;
  fallbackSrc?: string;
} & ImageProps;

export const ImageWithFallback = ({
  alt,
  src,
  fallbackSrc = '/fallback-post-image.png',
  ...props
}: TImageWithFallbackProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <Image
      alt={alt}
      src={isError ? fallbackSrc : src}
      onError={() => !isError && setIsError(true)}
      {...props}
    />
  );
};
