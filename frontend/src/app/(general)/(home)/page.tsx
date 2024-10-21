import { HomeHeader } from '@/components';
import { getPosts, PostItem } from '@/features/posts';

const HomePage = async () => {
  const { data: posts } = await getPosts();

  return (
    <div className="flex flex-col items-center pb-20 md:ml-20 md:mt-4 md:pb-4 xl:ml-0">
      <HomeHeader />
      <div>
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default HomePage;
