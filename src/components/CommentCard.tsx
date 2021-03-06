import { IComment } from '@libs/types';
import { FC } from 'react';

const CommentCard: FC<IComment> = ({ content }) => {
  return (
    <div className=' card w-50 bg-dark'>
      <p className='card-body'>{content}</p>
    </div>
  );
};

export default CommentCard;
