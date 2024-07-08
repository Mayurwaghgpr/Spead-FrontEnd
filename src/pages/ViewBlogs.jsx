import React, { useState, useEffect, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useFetchAllPostsQuery,
  useFetchDataByTopicQuery,
} from "../redux/slices/postsApi";
import { setData, setTopiclist } from "../redux/slices/postSlice";

function Viewblogs() {
  const { postsData, topiclist } = useSelector((state) => state.posts);
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const prevTopic = useRef("");

  const {
    data: allPostsData,
    isLoading,
    isError,
    isSuccess,
  } = useFetchAllPostsQuery();
  const { data: dataByTopic } = useFetchDataByTopicQuery(topic, {
    skip: !topic,
  });

  useEffect(() => {
    if (dataByTopic) {
      dispatch(setData(dataByTopic));
    } else {
      dispatch(setData(allPostsData));
    }
  }, [dataByTopic, dispatch, allPostsData]);

  useEffect(() => {
    if (allPostsData) {
      const uniqueTopics = Array.from(
        new Set(allPostsData.map((el) => el.topic))
      );
      dispatch(setTopiclist(uniqueTopics));
    }
  }, [allPostsData, dispatch]);

  return (
    <div className="h-[100vh] text-black">
      <main className="grid sm:grid-cols-12 sm:grid-rows-10 gap-1 h-screen">
        <aside className="sm:col-span-3 sm:flex justify-end sm:h-[150vh] col-span-0 min-h-screen p-3 hidden text-xl border-e border-b">
          <div className="flex flex-col pe-4 w-full items-center text-start gap-2">
            <h1 className="font-medium  sm:text-sm lg:text-lg xl:text-xl">
              Trending topics
            </h1>
            <div className="flex justify-center items-end flex-col">
              <ul className="flex justify-start flex-wrap gap-2">
                {topiclist?.map((t, index) => (
                  <li
                    key={index}
                    className="border text-sm rounded-2xl border-sky-100 bg-sky-50 px-2 py-0.5 dark:text-black dark:border-sky-500/15 dark:bg-sky-500/10"
                  >
                    <NavLink
                      to="/blogs"
                      className="t-btn"
                      onClick={() => setTopic(t)}
                    >
                      <span>{t}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <section className="grid grid-cols-12 h-screen sm:col-start-5 sm:col-span-8  col-span-full">
          <ul className="flex border-b pl-5 pt-4 pb-2 h-[3rem] justify-start items-center gap-3 col-span-10 sm:col-span-9 row-span-1">
            <li className="rounded-full capitalize">
              <Link to="/blogs" className="t-btn" onClick={() => setTopic("")}>
                Your Feed
              </Link>
            </li>
            <li>
              <Link to="#">Specialization</Link>
            </li>
          </ul>
          <div className="relative col-span-10 snap-center overflow-y-scroll no-scrollbar">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Viewblogs;
