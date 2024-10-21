import { GoBackButton } from '@/components';

export const PostItemHeader = () => {
  return (
    <div className="relative flex w-full items-center justify-center border-b py-3 md:hidden">
      <GoBackButton className="absolute left-2" />
      <h2 className="text-lg font-medium">Post</h2>
    </div>
  );
};
