import CreateComment from '@components/CreateComment';
import CommentCard from '@components/CommentCard';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const index = () => {
  const {
    query: { postId },
  } = useRouter();

  const [comments, setComments] = useState(null);

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
      {[...new Array(5)].map((_, i) => (
        <CommentCard key={i} />
      ))}
    </div>
  );
};

export default index;
