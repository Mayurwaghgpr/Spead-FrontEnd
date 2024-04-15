import React, { useEffect, useState } from 'react'
import thumbnail from "../assets/siginimage.png"
function Blog() {
    const [data,setdata]= useState([]);
  useEffect(() => {
  fetch('http://localhost:4000/posts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setdata(data);
      console.log(data);
    }).catch(error => {
      console.error('Error:', error);
      setdata([{
        id:0,
        title:"server down",
        image:"https://ginbits.com/wp-content/uploads/2021/08/How-to-Fix-500-Internal-Server-Error.png"
      }])
      console.log("oops")
  });
  return () => console.log("Unmounting component");
}, []);

const limitWordsAndAddEllipsis = (text, limit) => {
  if(text){
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
  }
};
  return(
   <div className="vh-100  w-100 gap-5 overflow-y-auto border blog-area">
   {data.map(data=>{return<div key={data.id} className='container gap-4 Blog-post p-4 border-bottom mb-3 shadow '>
           <label htmlFor="heading">Toppic :</label><h1 className='fs-6'>{data.title}</h1>
            <div className='image-container shadow'><img src={data.image} alt="" /></div> 
            <div className='text-start blog-content'>
            <p>{limitWordsAndAddEllipsis(data.content,20)}</p>
            <div className='auther-detail'>
            <label htmlFor="Author">Auther: {data.author}</label>
            <label htmlFor="Date">Date: {data.date}</label>
            </div>
            <div>
            <button >Read More...</button>
            </div>
          </div>
          
        </div>})}
    </div>
  )
}

export default Blog;