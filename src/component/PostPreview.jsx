import React, { useContext, useEffect, useState } from 'react';
import FullBlogView from '../pages/FullBlogView/FullBlogView';
import { useOutletContext } from 'react-router-dom';
import { format } from 'date-fns';
import { DeletPostApi } from '../handlers/PostsHandler'
import Usercontext from '../context/UserContext';

function PostPreview(props) {
  const { user } = useContext(Usercontext);
  const context = useOutletContext();
  const [data, setData] = useState(props.data);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (context) {
      setData(context);
    }
  }, [context]);

  const handleReadMore = (postId) => {
    const post = data.find(post => post.id === postId);
    setSelectedPost(post);
    setIsOpen(true);
  };

  const limitWordsAndAddEllipsis = (text, limit) => {
    if (text) {
      const words = text.split(' ');
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      }
      return text;
    }
  };

  const deletePost = async (id) => {
    const confirmDeletion = window.confirm("Do you really want to delete the post?");
    if (confirmDeletion) {
      try {
        const response = await DeletPostApi(id);
        if (response.ok) {
          setData(data.filter(p => p.id !== id));
        } else {
          alert('Failed to delete the post.');
        }
      } catch (error) {
        console.error('Error deleting the post:', error);
        alert('An error occurred while deleting the post.');
      }
    }
  };

  return (
    <>
      {data?.map((post) => (
        <div key={post.id}  className="border-b flex w-full mt-1 flex-col h-[250px] sm:h-75">
          <div onClick={() => handleReadMore(post?.id)} className="p-3 flex flex-col gap-2">
            <div className="flex gap-2 text-sm">
              <div className="flex gap-3">
                <img className="h-[30px] w-[30px] bg-slate-500 hover:opacity-75 cursor-pointer rounded-full" src={`http://localhost:3000/${post?.imageUrl}`} alt="Author" />
                <label className="capitalize" htmlFor="Author">{post.User.username}</label>
              </div>
              <label htmlFor="Date">{post?.createdAt ? format(new Date(post?.createdAt), 'LLL-dd-yyyy') : format(new Date(post?.date), 'LLL-dd-yyyy')}</label>
            </div>
            <div className="cursor-pointer flex  p-2">
              <div className="w-[80%] flex- gap-2">
                  <div className='w-full'>
                    <h1 className="font-bold block">{post.title}</h1>
                  </div>
                  <div>
                    <p className="hidden sm:block">{limitWordsAndAddEllipsis(post?.content, 30)}</p>
                  </div>
              </div>
              <div className="w-[20%] ">
                <img className=" rounded-xl  w-[80px] h-[80px]" src={`http://localhost:3000/${post?.imageUrl}`} alt="Post" />
              </div>
            </div>
          </div>
          <div  className="mb-1 flex justify-between items-center sm:p-5 p-3">
            <div></div>
            <div className='relative'>
            <div>
              <button  type="button">
                <i className="bi bi-three-dots-vertical cursor-pointer"></i>
              </button>
            </div>
           {/* {<div className='absolute right-0 top-5 mt-2 p-1 bg-white border before:content-normal before:absolute before:-top-[0.3rem] before:right-[.3rem] before:h-[10px] before:w-[10px] before:rotate-45 before:bg-white before:border-l before:border-t  border-gray-300 rounded-lg shadow-lg'>
              <ul className='flex flex-col justify-center p-2 w-[100px]' >
                <li>
                  {post.User.id.toString() === user.id.toString().trim()  &&
                    <button className="" onClick={() => deletePost(post.id)}>Delete Post</button>
                  }
                </li>
                <li>Edit</li>
              </ul>
            </div>} */}
          </div>
          </div>
        </div>
      ))}
      {isOpen && <FullBlogView post={selectedPost} onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default PostPreview;
