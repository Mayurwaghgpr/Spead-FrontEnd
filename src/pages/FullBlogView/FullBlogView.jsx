import React, { useEffect } from "react";
import Comment from "../../component/postsComp/comment";
import { format } from "date-fns";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFetchDataByIdQuery } from "../../redux/slices/postsApi";
import profileIcon from "/user.png";
import "boxicons";

function FullBlogView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: postDatabyId,
    isLoading,
    isError,
  } = useFetchDataByIdQuery(id, {
    skip: !id,
  });

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  // }, [isError, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const firstContent = postDatabyId?.[0];

  return (
    <section className="container mx-auto py-6">
      <article className="max-w-4xl mx-auto p-6 bg-white rounded-lg ">
        <header className="mb-6">
          <h1 className="text-3xl break-words lg:text-5xl font-bold mb-2">
            {firstContent?.title}
          </h1>

          <section className="mb-6">
            <p className="text-lg lg:text-2xl text-gray-800 leading-relaxed">
              {firstContent?.subtitelpagraph}
            </p>
          </section>

          <div className="flex items-center my-4">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={
                firstContent?.User.userImage
                  ? `${import.meta.env.VITE_BASE_URL}/${
                      firstContent?.User.userImage
                    }`
                  : profileIcon
              }
              alt={`${firstContent?.User.username}'s profile`}
            />
            <div>
              <Link
                to={`/profile/@${firstContent?.User.username
                  .split(" ")
                  .slice(0, -1)
                  .join("")}/${firstContent?.User?.id}`}
                className="text-gray-700 hover:text-gray-900"
              >
                {firstContent?.User?.username}
              </Link>
              <p className="text-sm text-gray-500">
                {format(new Date(firstContent?.createdAt), "LLL dd, yyyy")}
              </p>
            </div>
          </div>
        </header>

        <div className="flex justify-between items-center border-y py-3">
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <box-icon name="like"></box-icon>
              <span>35 Likes</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <box-icon name="comment"></box-icon>
              <span>100 Comments</span>
            </button>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <box-icon name="message-square-add"></box-icon>
              <span>Save</span>
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <box-icon name="dots-horizontal-rounded"></box-icon>
              <span>More</span>
            </button>
          </div>
        </div>
        <figure className="my-6">
          <img
            className="w-full rounded-lg"
            src={`${import.meta.env.VITE_BASE_URL}/${firstContent?.titleImage}`}
            alt="Main Blog Image"
          />
          <figcaption></figcaption>
        </figure>
        {postDatabyId?.map((item) => (
          <section key={item.id} className="mb-6">
            {item.imageUrl && (
              <figure className="mb-4">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${item.imageUrl}`}
                  alt="Content"
                  className="w-full rounded-lg"
                />
                <figcaption className="text-center">{item.title}</figcaption>
              </figure>
            )}
            {item.Content && (
              <p className="text-lg text-gray-800">{item.Content}</p>
            )}
          </section>
        ))}
        <section className="mt-8">
          <Comment />
        </section>
      </article>
    </section>
  );
}

export default FullBlogView;
