import React, { useEffect } from "react";
import Comment from "../../component/comment";
import { format } from "date-fns";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetchDataByIdQuery } from "../../redux/slices/postsApi";
import "boxicons";

function FullBlogView() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const parms = useParams();
  console.log(parms);
  const {
    data: postDatabyId,
    isLoading,
    isError,
  } = useFetchDataByIdQuery(parms.id, {
    skip: !parms.id,
  });

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  // }, [isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const firstContent = postDatabyId[0];

  return (
    <main className="row-span-full transition-all duration-700 bg-white">
      <div className="flex flex-col items-center">
        <article className="flex w-full lg:w-[800px] justify-center break-words items-center p-3 flex-col">
          <div
            key={firstContent?.id}
            className="flex w-full lg:px-2 flex-col justify-center items-center m-3"
          >
            <div className="text-start w-full font-bold mb-2">
              {firstContent?.title && (
                <h2 className="lg:text-5xl text-lg font-bold">
                  {firstContent?.title}
                </h2>
              )}
            </div>
            <div className="flex p-1 flex-col justify-center items-start w-full">
              <div className="w-full p-1">
                {firstContent?.subtitelpagraph && (
                  <p className="lg:text-2xl mb-4 w-ful text-slate-600 text-justify">
                    {firstContent?.subtitelpagraph}
                  </p>
                )}
              </div>
              <Link
                to={`/profile/@${firstContent?.User.username
                  .split(" ")
                  .slice(0, firstContent?.User.username.length - 1)
                  .join("")}/${firstContent?.User?.id}`}
                state={{ id: firstContent?.User?.id }}
                className="flex mb-2 gap-3 w-full justify-start font-light items-center"
              >
                {firstContent?.User.userImage && (
                  <img
                    className="w-[50px] rounded-full h-[50px]"
                    src={`${import.meta.env.VITE_BASE_URL}/${
                      firstContent?.User.userImage
                    }`}
                    alt="user"
                  />
                )}
                <div>
                  <p
                    title={firstContent?.User}
                    className="hover:underline hover:text-black"
                  >
                    {firstContent?.User?.username}
                  </p>
                  <div className="">
                    {firstContent?.createdAt &&
                      format(new Date(firstContent?.createdAt), "LLL dd, yyyy")}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full">
            <div className="p-1 flex justify-between items-center border-y">
              <div className="flex w-[50%] justify-start gap-5">
                <span
                  title="Like"
                  className="text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <box-icon name="like"></box-icon>
                  <small>35</small>
                </span>
                <span className="text-center flex items-center justify-center gap-1 cursor-pointer">
                  <box-icon name="comment"></box-icon>
                  <small>100</small>
                </span>
              </div>
              <div className="flex justify-end pe-2 gap-5 w-[50%] items-center">
                <span title="Save">
                  <box-icon name="message-square-add"></box-icon>
                </span>
                <span className="text-center">
                  <box-icon name="dots-horizontal-rounded"></box-icon>
                </span>
              </div>
            </div>
          </div>
          <div>
            <img
              className="lg:h-[400px] h-[150px] w-[1000px]"
              src={`${import.meta.env.VITE_BASE_URL}/${
                firstContent?.titleImage
              }`}
              alt=""
            />
          </div>
          {postDatabyId.map((item) => (
            <div key={item.id} className="w-full">
              {item.imageUrl && (
                <figure className="w-full max-h-[650px] px-2 my-3">
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${item.imageUrl}`}
                    alt="Content"
                  />
                  <figcaption className="text-center">{item.title}</figcaption>
                </figure>
              )}
              {item.Content && <p className="my-3">{item.Content}</p>}
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
