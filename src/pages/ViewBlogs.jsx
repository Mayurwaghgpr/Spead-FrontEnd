import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import "./viewblogs.css";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchDataByTopic, fetchDataAll } from "../Handlers/PostsHandler";
import UserContext from "../context/UserContext";
import FullBlogView from "./FullBlogView/FullBlogView";

function Viewblogs() {
  const location = useLocation();
  const {
    user,
    isLogin,
    logout,
    setSelectedPost,
    selectedPost,
    isOpen,
    setIsOpen,
    setData,
    data,
    topiclist,
    setTopiclist,
  } = useContext(UserContext);

  const [topic, setTopic] = useState();

  const prevTopic = useRef("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const result = await fetchDataAll();
        if (result.status === 200) {
          setData(result.data);
          const uniqueTopics = Array.from(
            new Set(result.data.map((el) => el.topic))
          );
          setTopiclist(uniqueTopics);
        } else {
          console.error("Error fetching all data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [topic, setData]);

  useEffect(() => {
    if (prevTopic.current !== topic && topic) {
      prevTopic.current = topic;
      console.log(topic);
      const fetchTopicData = async () => {
        try {
          const result = await fetchDataByTopic(topic);
          console.log(result);
          if (result.status === 200) {
            setData(result.data);
          } else if (result.status === 404) {
            navigate("*");
          }
        } catch (error) {
          console.error("Error fetching data by topic:", error);
        }
      };

      fetchTopicData();
    }
  }, [topic]);

  return (
    <div className="h-[100vh] text-black">
      <main className="grid sm:grid-cols-12 sm:grid-rows-10 gap-1 h-screen">
        <>
          <aside className="sm:col-span-3 sm:flex justify-end sm:row-span-full col-span-0 min-h-screen p-3 hidden text-xl border-e border-b ">
            <div className="flex flex-col pe-4 w-full items-center text-start gap-2">
              <h1 className="font-medium text-sm text-start sm:text-lg">
                Trending topics
              </h1>
              <div className="flex justify-center items-end flex-col">
                <ul className="flex justify-end gap-2">
                  {topiclist?.map((t, index) => (
                    <li
                      key={index}
                      className="border text-sm rounded-2xl border-sky-100 bg-sky-50 px-2 py-0.5 dark:text-black dark:border-sky-500/15 dark:bg-sky-500/10"
                    >
                      <NavLink
                        to="/Blogs"
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
          <section className="grid grid-cols-12 h-screen sm:col-start-5 sm:col-span-8 col-span-full ">
            <ul className="flex border-b pl-5 pt-4 pb-2 h-[3rem] justify-start items-center gap-3 col-span-10 sm:col-span-9 row-span-1">
              <li className="rounded-full capitalize">
                <Link
                  to="/blogs"
                  className="t-btn"
                  onClick={() => setTopic("")}
                >
                  Your Feed
                </Link>
              </li>
              <li>
                <Link to="#">Specialization</Link>
              </li>
            </ul>
            <div className="relative col-span-10 snap-center overflow-y-scroll no-scrollbar">
              <Outlet context={data} />
            </div>
          </section>
        </>
      </main>
    </div>
  );
}

export default Viewblogs;
