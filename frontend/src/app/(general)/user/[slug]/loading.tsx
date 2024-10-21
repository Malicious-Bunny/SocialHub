import { Skeleton } from '@/components';

const UserLoading = () => {
  return (
    <div className="flex flex-col items-center space-y-3 pt-8 md:ml-20 xl:ml-0">
      <Skeleton className="size-[150px] rounded-full" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <div className="grid w-full max-w-2xl grid-cols-3 justify-center gap-1 pt-3">
        {Array.from({ length: 9 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="h-[125px] w-full rounded-none md:h-[200px]"
          />
        ))}
      </div>
    </div>
  );
};

export default UserLoading;
