import CreatePost from '@components/CreatePost';
import PostCard from '@components/PostCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '@components/Loader';
import { IPost } from '@libs/types';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>(null);

  const getPosts = async () => {
    const { data } = await axios.get('/posts?_sort=createdAt&_order=desc');
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h4>useSWR Hook ⛳</h4>
      <CreatePost setPosts={setPosts} />

      <h4>Posts</h4>

      {!posts && <Loader />}

      {posts?.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
