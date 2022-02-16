import axios from 'axios';
import { useState } from 'react';

const CreatePost = ({ setPosts }) => {
  const [content, setContent] = useState('');

  // Duplicate browser and you can see adding a new post in one page does not reflect to another page.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 10000);

    const { data } = await axios({
      method: 'post',
      url: '/posts',
      data: {
        id,
        content,
        createdAt: Date.now(),
      },
    });
    setPosts((posts) => [...posts, data]);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className='mx-auto w-50 '>
      <textarea
        cols={3}
        className='form-control'
        placeholder='Write your dream post:)'
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button className='btn btn-outline-warning' type='submit'>
        Add Post
      </button>
    </form>
  );
};

export default CreatePost;
