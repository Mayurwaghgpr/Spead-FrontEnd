import React, { useState } from "react";

function CreatBlog() {
    const [Newblog, setNewblog] = useState([]);
    const [blog, setBlog] = useState({
        id: 1,
        title: "",
        content: "",
        author: "mayur",
    });

    function Fillblog(el) {
        const { value, name } = el.target;
        setBlog(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleForm(e) {
        e.preventDefault();
        setNewblog(prevState => [...prevState, blog]);

        fetch('http://localhost:4000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blog),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
            console.log("oops")
        });
    }

    return (
        <div className="col vh-100 d-flex justify-content-center align-items-center flex-column overflow-x-hidden overflow-y-auto">
            <div className="container d-flex bg-white flex-column m-5 max-vw-50 p-5 justify-content-center align-items-center rounded-3 shadow creat-blog">
                <h1 className="fs-3">New Blog Post</h1>
                <form onSubmit={handleForm} className="form-floating w-100 d-flex justify-content-center flex-column gap-3" id="newPostForm" method="post" action="/api/posts">
                    <input onChange={Fillblog} className="form-control" type="text" name="title" placeholder="Title" value={blog.title} required />
                    <textarea onChange={Fillblog} className="form-control max-vh-50" id="floatingTextarea2" name="content" placeholder="Content" value={blog.content} required rows="50"></textarea>
                    <small>{blog.author}</small>
                    <button className="btn" type="submit">POST</button>
                </form>
            </div>
        </div>
    );
}

export default CreatBlog;
