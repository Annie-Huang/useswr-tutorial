import CreateComment from '@components/CreateComment';
import CommentCard from '@components/CommentCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IComment, IPost } from '@libs/types';
import Loader from '@components/Loader';
import PostCard from '@components/PostCard';

const index = () => {
  const {
    query: { postId },
  } = useRouter();

  const [comments, setComments] = useState<IComment[]>(null);
  const [post, setPost] = useState<IPost>(null);

  const getPost = async () => {
    const { data } = await axios.get(
      '/posts/${postId}?_sort=createdAt&_order=desc'
    );
    setPost(data);
  };

  const getComments = async () => {
    const { data } = await axios.get(
      `/posts/${postId}/comments?_sort=createdAt&_order=desc`
    );
    setComments(data);
  };

  useEffect(() => {
    postId && getComments();
    postId && getPost();
  }, [postId]);

  return (
    <div>
      {/*<PostCard />*/}
      <CreateComment />

      <h4>Comments</h4>

      {!comments && <Loader />}

      {comments?.map((comment) => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default index;
