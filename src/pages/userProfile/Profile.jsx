import React, { useEffect, useState,Suspense ,lazy} from 'react'
import image from "../../assets/siginimage.png";
 import PostPriview from '../../component/PostPreview';
function Profile() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const token =localStorage.getItem('token')
        ; (async () => {
           const respons= await fetch(`http://localhost:3000/profile`, {
                headers: {
                    Authorization:'Bearer '+token
               }
           })
            console.log("respons",respons)
    })()
            return()=>{console.log('unmounting....')}
    }, []);

    return (
        <main className='grid  grid-cols-10   h-screen '>
            <div className='h-screen col-start-3 col-span-6 bg-red-100'>
                <div className='flex flex-col gap-4 bg-white border-b'>
                    <div className='grid grid-flow-col grid-cols-5 items-center '>
                        <div className='flex p-3 flex-col col-span-1 gap-2 justify-center items-center'>
                            <div className='relative flex justify-center  items-center h-[90px] w-[90px] rounded-full bg-slate-500'>
                                <img className='h-[80px] w-[80px] rounded-full' src={image} alt="" />
                                <span className='absolute flex justify-center items-center bg-lime-200 rounded-full h-[20px] w-[20px] bottom-0 right-1'>+</span>
                            </div>
                            <h1 className=''>Mayur Wagh</h1>
                        </div>
                        <div className='flex col-span-4 ps-5 justify-start items-center text-3xl'>
                            <h1>Posts <span>1</span></h1>
                        </div>
                    </div>
                    <div className='h-full'>
                        
                    </div>
                </div>
                <div className='user-blogs'>
                        <PostPriview data={data} editemod={true} />
                </div>
            </div>
        </main>
    )
}

export default Profile