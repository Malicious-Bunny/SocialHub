'use client';

import { useRouter } from 'next/navigation';

import { Button, Icons } from '@/components';

type TGoBackButtonProps = {
  className?: string;
};

export const GoBackButton = ({ className }: TGoBackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className={className}
    >
      <Icons.arrowLeft className="size-7" />
    </Button>
  );
};
