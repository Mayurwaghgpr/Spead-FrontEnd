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

  return(
   <div className="col vh-100  w-100 d-flex justify-content-around gap-5 align-items-center flex-column overflow-y-auto border">
   {data.map(data=>{return<div key={data.id} className='container d-flex flex-column gap-4 Blog-post p-4 border-bottom mb-3'>
           <label htmlFor="hedding">Toppic :</label><h1>{data.title}</h1>
            <div className=' image-container shadow'><img src={data.image} alt="" /></div> 
            <div className=' d-flex h-100 justify-content-center align-items-start flex-wrap flex-column text-start'>
            <p>{data.content}</p>
            <label htmlFor="Author">Auther: </label><small> {data.author}</small>
          </div>
        </div>})}
    </div>
  )
}

export default Blog
