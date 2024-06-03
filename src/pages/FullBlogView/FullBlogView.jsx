import React from 'react';
import './Profile.css';
import image from "../../assets/siginimage.png";
import Comment from '../../component/comment';
function FullBlogView(props) {
  return (
    <div className='Main-Profile'>
      {/* <div className='left'></div> */}
      <div className='blog-container'>
        <div className='user-blog'>
          <div className='profil-close-bt'><button onClick={props.onClose}><i className="bi bi-chevron-compact-left"></i></button></div>
          <div className='profile-heading'>
            <h1 className=''>{props.post.title}</h1>
            <div className='profile-auther'>
              <label htmlFor="label">Author:</label>
              <small>{props.post.User.username}</small>
            </div>
            <div className='blog-date'>{props.post.date?.split('T')[0]}</div>
          </div>
          <div className='blog-bigimage'>
            <img src={'http://localhost:3000/'+props.post.imageUrl} alt="" />
          </div>
          <div className='profile-content'>
            <p>{props.post.content}</p>
          </div>
        </div>
        <Comment />
      </div>
      {/* <div className='right'></div> */}
    </div>
  )
}

export default FullBlogView