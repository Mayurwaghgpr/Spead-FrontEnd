import React, { useContext, useEffect } from "react";
import Comment from "../../component/comment";
import { format } from "date-fns";
import UserContext from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "boxicons";

function FullBlogView() {
  const { selectedPost, setSelectedPost } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedPost) {
      const post = JSON.parse(localStorage.getItem("selectedPost"));
      if (post) {
        setSelectedPost(post);
      } else {
        navigate("/"); // Navigate to home if no post is found
      }
    }
  }, [selectedPost, setSelectedPost, navigate]);

  if (!selectedPost) {
    return <div>Loading...</div>; // Show a loading state if selectedPost is not yet available
  }
  console.log(selectedPost);

  // Extract and sort the content items based on the index
  const contentItems = selectedPost || [];
  contentItems.sort((a, b) => a.index - b.index);
  console.log(contentItems);

  return (
    <main className="row-span-full bg-white">
      <div className="flex flex-col items-center">
        <article className="flex w-[700px] justify-center break-words  items-center p-1 flex-col">
          <div
            key={contentItems[0].id}
            className="flex w-full  flex-col justify-center items-center  m-3"
          >
            <div className="text-start w-full font-bold text-5xl mb-2 ">
              {contentItems[0].title && (
                <h2 className="text-5xl font-bold">{contentItems[0].title}</h2>
              )}
            </div>
            <div className="flex p-1 flex-col justify-center items-start w-full">
              <div className=" w-full p-1">
                {contentItems[0].subtitelpagraph && (
                  <p className="text-2xl mb-4 w-ful text-slate-600 text-justify">
                    {contentItems[0].subtitelpagraph} Lorem ipsum dolor, sit
                    amet consectetur adipisicing elit. Nulla commodi velit
                    sapiente nam maxime? Ipsam voluptas iure, architecto
                    distinctio ut non pariatur placeat accusantium quod dolorum
                    consectetur voluptates velit tempora?
                  </p>
                )}
              </div>
              <Link
                to="/profile"
                state={{ id: contentItems[0].User?.id }}
                className="flex mb-2 gap-3 w-full justify-start font-light items-center"
              >
                {contentItems[0].titleImage && (
                  <img
                    className="w-[50px] rounded-full h-[50px]"
                    src={
                      "http://localhost:3000/" + contentItems[0].User.userImage
                    }
                    alt="user"
                  />
                )}
                <div>
                  <p
                    title={contentItems[0].User}
                    className="hover:underline hovertext-black"
                  >
                    {contentItems[0].User?.username}
                  </p>
                  <div className="ps-5">
                    {contentItems[0].createdAt &&
                      format(
                        new Date(contentItems[0].createdAt),
                        "LLL dd, yyyy"
                      )}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full">
            <div className=" p-1 flex justify-between items-center border-y  ">
              <div className="flex  w-[50%] justify-start gap-5">
                <span
                  title="Like"
                  className=" text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <box-icon name="like"></box-icon>
                  <small>35</small>
                </span>{" "}
                <span className=" text-center flex items-center justify-center gap-1 cursor-pointer">
                  <box-icon name="comment"></box-icon>
                  <small>100</small>
                </span>
              </div>
              <div className="flex justify-end pe-2 gap-5 w-[50%]  items-center">
                <span title="Save">
                  <box-icon name="message-square-add"></box-icon>
                </span>
                <span className="text-center">
                  <box-icon name="dots-horizontal-rounded"></box-icon>
                </span>
              </div>
            </div>
          </div>
          {contentItems.map((item) => (
            <div key={item.id} className=" w-full ">
              {item.imageUrl && (
                <figure className="w-full max-h-[650px] px-2 my-3">
                  <img
                    src={"http://localhost:3000/" + item.imageUrl}
                    alt="Content"
                  />
                  <figcaption className="text-center">{item.title}</figcaption>
                </figure>
              )}
              {item.Content && (
                <p className="my-3">
                  {item.Content} Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Nostrum, assumenda harum sit officiis vel
                  quos eos! Modi eum ratione culpa incidunt esse sequi, tempore
                  dignissimos, dolor perspiciatis voluptate eveniet vero. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Asperiores
                  cum omnis consectetur pariatur delectus reiciendis, at
                  exercitationem quisquam necessitatibus voluptas sed dolore
                  provident temporibus neque ratione consequuntur ab cumque
                  voluptates.
                </p>
              )}
            </div>
          ))}
        </article>

        <section className="mt-5 flex sm:w-[700px] justify-start w-full items-center">
          <Comment />
        </section>
      </div>
    </main>
  );
}

export default FullBlogView;
