import { HomeHeader, Skeleton } from '@/components';

const HomeLoading = () => {
  return (
    <div className="flex flex-col items-center pb-20 md:ml-20 md:mt-4 md:pb-4 xl:ml-0">
      <HomeHeader />
      <div className="w-full max-w-xl">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="space-y-4 py-6 [&:not(:last-child)]:border-b"
          >
            <div className="flex items-center space-x-4 px-4">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-[400px] w-full rounded-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLoading;
