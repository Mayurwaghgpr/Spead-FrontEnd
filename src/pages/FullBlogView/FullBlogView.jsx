import React, { useEffect, useState } from "react";
import Comment from "../../component/postsComp/comment";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import "boxicons";
import { useQuery } from "react-query";

import SomthingWentWrong from "../ErrorPages/somthingWentWrong";
import Bookmark from "../../component/buttons/Bookmark";
import CopyToClipboardInput from "../../component/CopyToClipboardInput";
import CodeDisplay from "../../component/CodeDisplay";
import usePublicApis from "../../Apis/publicApis";

function FullBlogView() {
  const [openComments, setOpenComments] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { fetchDataById } = usePublicApis();

  const {
    data: postDatabyId,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fullpostData", id],
    queryFn: () => fetchDataById(id),
  });

  if (isError || error) {
    console.error("Error fetching data:", error);
    return <SomthingWentWrong />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }
  const { postTopdata } = postDatabyId;

  return (
    <main className="container mx-auto py-6 mt-16 dark:*:border-[#383838]">
      <article className="max-w-4xl mx-auto p-6 rounded-lg flex flex-col justify-center items-center ">
        <header className="mb-6 w-full">
          <h1 className="text-3xl break-words lg:text-5xl font-bold mb-2">
            {postTopdata?.title}
          </h1>
          <section className="mb-6">
            <p className="text-lg lg:text-2xl leading-relaxed">
              {postTopdata?.subtitelpagraph}
            </p>
          </section>
          <div className="flex items-center my-4">
            <img
              alt={`${postTopdata?.User?.username}'s profile`}
              src={
                postTopdata?.User?.userImage &&
                `${postTopdata?.User?.userImage}`
              }
              className="w-12 h-12 rounded-full mr-4 object-cover object-top"
              loading="lazy"
            />
            <div>
              <Link
                to={`/profile/@${postTopdata?.User?.username
                  ?.split(" ")
                  .slice(0, -1)
                  .join("")}/${postTopdata?.User?.id}`}
              >
                {postTopdata?.User?.username}
              </Link>
              <p className="text-sm ">
                {format(new Date(postTopdata?.createdAt), "LLL dd, yyyy")}
              </p>
            </div>
          </div>
        </header>

        <div className="flex justify-between items-center border-inherit border-y px-3 py-3 text-lg font-light  w-full">
          <div className="flex gap-4">
            <button className="flex items-center gap-1">
              <i className="bi bi-hand-thumbs-up"></i>
              <span>35</span>
            </button>
            <button
              onClick={() => setOpenComments(true)}
              className="flex items-center gap-1"
            >
              <i className="bi bi-chat"></i>
              <span>100</span>
            </button>
          </div>
          <div className="flex gap-7 justify-between">
            <Bookmark post={postTopdata} />
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
              <i className="bi bi-three-dots"></i>
            </button>
          </div>
        </div>

        {postTopdata?.titleImage && (
          <figure className="my-6 w-full">
            <img
              className="w-full rounded-lg"
              src={`${postTopdata?.titleImage}`}
              alt="Main Blog Image"
              loading="lazy"
            />
            <figcaption></figcaption>
          </figure>
        )}

        <div className="w-full flex flex-col justify-center text-start items-center gap-5">
          {/* {console.log({ postDatabyId })} */}
          {postDatabyId?.otherContent?.map((item) => (
            <section key={item.id} className="mb-6 w-full px-2">
              {console.log(item)}
              {item.imageUrl && (
                <figure className="mb-4">
                  <img
                    src={`${item.imageUrl}`}
                    alt="Content"
                    className="w-full rounded-lg object-cover object-center"
                    loading="lazy"
                  />
                  <figcaption className="text-center">{item.title}</figcaption>
                </figure>
              )}
              {item?.type === "text" ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.Content),
                  }}
                  className="text-lg w-full "
                ></p>
              ) : (
                item?.type === "url" && (
                  <CopyToClipboardInput
                    type={item.Content.type}
                    code={item.Content}
                  />
                )
              )}
            </section>
          ))}
        </div>
      </article>
      {openComments && <Comment setOpenComments={setOpenComments} />}
    </main>
  );
}

export default FullBlogView;
