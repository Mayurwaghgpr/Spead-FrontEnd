import React, { useState } from "react";

function CreatBlog() {
    const [Newblog, setNewblog] = useState([]);
    const [blog, setBlog] = useState({
        id: 1,
        title: "",
        content: "",
        author: "Mayur",
        date: new Date(),
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
        <div className="col h-screen flex justify-center items-center flex-col overflow-x-hidden overflow-y-auto">
            <div className="container flex flex-col bg-white m-5 max-w-screen-md p-5 justify-center items-center rounded-lg shadow creat-blog">
                <h1 className="text-lg">New Blog Post</h1>
                <form onSubmit={handleForm} className="form w-full flex flex-col gap-3" id="newPostForm" method="post" action="/api/posts">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input onChange={Fillblog} className="form-input rounded-md mb-3" type="text" name="title" id="title" placeholder="Title" value={blog.title} required />
                    <label htmlFor="Image" className="form-label">Image:</label>
                    <input type="file" accept="image/*" onChange={Fillblog} />
                    <label htmlFor="content" className="form-label">Content:</label>
                    <textarea onChange={Fillblog} className="form-textarea rounded-md mb-3" id="content" name="content" placeholder="Content" value={blog.content} required></textarea>
                    <small>{blog.author}</small>
                    <button className="btn rounded-md mt-3" type="submit">POST</button>
                </form>
            </div>
        </div>
    );
}

export default CreatBlog;
