import CreateComment from '@components/CreateComment';
import CommentCard from '@components/CommentCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IComment } from '@libs/types';
import Loader from '@components/Loader';

const index = () => {
  const {
    query: { postId },
  } = useRouter();

  const [comments, setComments] = useState<IComment[]>(null);

  const getPost = () => {};

  const getComments = async () => {
    const { data } = await axios.get(
      `/posts/${postId}/comments?_sort=createdAt&_order=desc`
    );
    setComments(data);
  };

  useEffect(() => {
    postId && getComments();
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
