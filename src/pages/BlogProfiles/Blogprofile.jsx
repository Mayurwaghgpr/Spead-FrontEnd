import React from 'react';
import './Profile.css';
import image from "../../assets/siginimage.png";
import Comment from '../../component/comment';
function Blogprofile(props) {
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
              <small>{props.post.author}</small>
            </div>
            <div className='blog-date'>{props.post.date}</div>
          </div>
          <div className='blog-bigimage'>
            <img src={props.post.image} alt="" />
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

export default Blogprofile