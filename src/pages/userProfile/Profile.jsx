import React, { useEffect, useState } from 'react'
import image from "../../assets/siginimage.png";
import Privcard from '../../component/Privcard';
function Profile() {
    const [data, setData] = useState([]);
    useEffect(() => {
        // console.log("set", category);
        fetch(`http://localhost:3000/posts?type=${'All'}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setData([
                    {
                        id: 0,
                        title: "server down",
                        image: "https://ginbits.com/wp-content/uploads/2021/08/How-to-Fix-500-Internal-Server-Error.png",
                    },
                ]);
                console.log("oops");
            });
    }, []);

    return (
        <main className='Profile-container'>
            <div className='user-profile  bg-red-100'>
                <div className='user-Prof-info'>
                    <div className='user-heading'>
                        <div className='user-image'>
                            <img src={image} alt="" />
                            <small>mayur wagh</small>
                        </div>
                        <div className='post-info'>
                            <h1>Posts <span>1</span></h1>
                        </div>
                    </div>
                    <div className='user-info'></div>
                </div>
                <div className='user-blogs'>
                    <div><label htmlFor="mypost" className='px-4'>Posts</label></div>
                    <Privcard data={data} editemod={true} />
                </div>
            </div>
        </main>
    )
}

export default Profile