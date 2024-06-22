import React, { useContext, useEffect } from "react";
import Comment from "../../component/comment";
import { format } from "date-fns";
import Usercontext from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
function FullBlogView() {
  const { selectedPost, setSelectedPost } = useContext(Usercontext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedPost) {
      setSelectedPost(JSON.parse(localStorage.getItem("selectedPost")));
    }
  }, []);
  return (
    <main className="row-span-full col-span-10 bg-white   ">
      {/* <div className='left'></div> */}
      <div className=" flex flex-col items-center ">
        <article className="flex justify-center items-center p-1 flex-col">
          <div className="flex w-[700px] flex-col justify-center items-center p-2 m-3 ">
            <div className=" text-start w-full font-bold text text-5xl break-words">
              <h1 className="w-full">{selectedPost?.title}</h1>
            </div>
            <div className="flex flex-col justify-center  items-start w-full">
              <div className="">
                <p className="py-3 font-light text-xl text-wrap">
                  {selectedPost?.subtitelpagraph} Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sunt dignissimos saepe non,
                  accusamus modi autem minus in corporis natus suscipit amet
                  tenetur! Id vel temporibus magni, at optio autem voluptatum!
                </p>
              </div>
              <div className="flex gap-3 justify-center  font-light items-center">
                <img
                  className=" w-[50px] rounded-full h-[50px]"
                  src={"http://localhost:3000/" + selectedPost?.titleImage}
                  alt="user"
                />
                <div>
                  <p>{selectedPost?.User?.username}</p>
                  <div className=" ps-5">
                    {selectedPost?.createdAt &&
                      format(new Date(selectedPost?.createdAt), "LLL dd,yyyy")}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full m-5 ">
              <hr />
              <div className="">dsds</div>
              <hr />
            </div>
          </div>
          <div className="w-full sm:w-[700px]  flex  justify-center items-center ">
            <img
              className="w-full max-h-[650px] px-2"
              src={"http://localhost:3000/" + selectedPost?.titleImage}
              alt=""
            />
          </div>
          <div className="w-[700px]"></div>
        </article>
        <section className="mt-5 flex sm:w-[700px] justify-start w-full  items-center">
          <Comment />
        </section>
      </div>
      {/* <div className='right'></div> */}
    </main>
  );
}

export default FullBlogView;
