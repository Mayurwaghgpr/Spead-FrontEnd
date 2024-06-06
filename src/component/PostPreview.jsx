import React, { useContext, useEffect, useState } from 'react';
import FullBlogView from '../pages/FullBlogView/FullBlogView';
import { useOutletContext } from 'react-router-dom';
import { format } from 'date-fns';
import { DeletPostApi } from '../handlers/PostsHandler'
import Usercontext from '../context/UserContext';
import ConfirmationBox from '../component/ConfirmationBox';

function PostPreview(props) {
  let did;
  const { user} = useContext(Usercontext);
  const [isConfirmBox, setConfirmBox] = useState({message:'',status:false})
  const [isConfirm, setisConfirm] = useState(false)
  const context = useOutletContext();
  const [data, setData] = useState(props.data);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [menuid, setmenuid] = useState('')
  const [id,setId] = useState('')

  useEffect(() => {
    if (context) {
      setData(context);
    }
  }, [context]);

  useEffect(() => {
    if (isConfirm) {
      handleDeletionApi(id)
    }
  },[isConfirm])

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

  const deletePost = (id) => {
    console.log('deletpost',id)
    setId(id)
    setConfirmBox(prev => { return { ...prev, message: "Do you really want to delete the post?", status: true } })
    setmenuid('');
  }
    // const confirmDeletion = window.confirm();
  async function handleDeletionApi(id) {
    console.log('handelPost',id)
    try {
      if (isConfirm) {
        const response = await DeletPostApi(id);
        if (response.status === 200) {
            setData(data.filter(p => p.id !== id));
        } else {
          alert('Failed to delete the post.');
        }
      }
      } catch (error) {
        console.error('Error deleting the post:', error);
        alert('An error occurred while deleting the post.');
      }
  };

  return (
    <>
      {data?.map((post) => (
        <article key={post.id} className="border-b flex w-full mt-1 flex-col h-[250px] sm:h-75">
          <div onClick={() => handleReadMore(post?.id)} className="p-3 flex flex-col gap-2">
            <div className="flex gap-2 text-sm">
              <div className="flex gap-3">
                <img className="h-[30px] w-[30px] bg-slate-500 hover:opacity-75 cursor-pointer rounded-full" src={`http://localhost:3000/${post?.imageUrl}`} alt="Author" />
                <label className="capitalize " htmlFor="Author">{post.User.username}</label>
              </div>
              <label className='text-slate-500' htmlFor="Date">{post?.createdAt ? format(new Date(post?.createdAt), 'LLL-dd-yyyy') : format(new Date(post?.date), 'LLL-dd-yyyy')}</label>
            </div>
            <div className="cursor-pointer grid grid-cols-10 p-2">
              <div className="col-span-8 flex flex-col justify-center items-start gap-3 me-[4rem]">
                <div className=' w-full '>
                    <p className="font-extrabold text-lg break-words  block ">{post.title}</p>
                </div>
                <div className=' w-full'>
                    <p className="hidden sm:block">{limitWordsAndAddEllipsis(post?.content, 30)}</p>
                </div>
              </div>
              <div className=" col-span-2">
                <img className="w-[100px] h-[100px]" src={`http://localhost:3000/${post?.imageUrl}`} alt="Post" />
              </div>
            </div>
          </div>
          <div className="mb-1 flex w-full items-center sm:p-5 p-3">
            <div className='w-[50%]'>
              <h1 className=' text-slate-500 text-sm b'>{post.type}</h1>
              </div>
            <div className='relative w-[50%] flex justify-center items-center'>
              <div className="relative group">
                  <div className="absolute -top-5 -left-2 hidden bg-black z-50 group-hover:block">
                    <small>more</small>
                  </div>
                </div>
            <div className=''>
              <button className='' onClick={()=>setmenuid(prev=> prev === '' ? prev = post.id : '')}  type="button">
                <i className="bi bi-three-dots-vertical cursor-pointer "></i>
              </button>
            </div>
           {menuid === post.id && <div id={post.id} className='absolute  sm:top-5 mt-2 p-1 bg-white border before:content-normal before:absolute before:-top-[0.3rem] before:right-[3rem] before:h-[10px] before:w-[10px] before:rotate-45 before:bg-white before:border-l before:border-t  border-gray-300 rounded-lg'>
              <ul className='flex flex-col justify-center p-2 w-[100px]' >
                <li>
                  {post.User.id.toString() === user.id.toString().trim()  &&
                    <button className=" " onClick={() => deletePost(post.id)}>Delete Post</button>
                  }
                </li>
                <li>Edit</li>
              </ul>
            </div>}
            </div>
          </div>
        </article>
      ))}
      {isOpen && <FullBlogView post={selectedPost} onClose={() => setIsOpen(false)} />}
       {isConfirmBox.status && <ConfirmationBox isConfirmBox={isConfirmBox} setConfirmBox={setConfirmBox} setIsConfirm={setisConfirm} />}
    </>
  );
}

export default PostPreview;
