import React, { useState, useEffect } from "react";
import "./viewblogs.css";
import { Link, NavLink, Outlet } from "react-router-dom";

function Viewblogs() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    console.log("set", category);
    fetch(`http://localhost:3000/posts?type=${category}`)
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
  }, [category]);

  return (
    <div className="container-fluid">
      <div className="row w-20">
        <div className="col-12 col-md-2 vh-100 d-none d-md-block">
          <div className="">
            <Link to="/" className="d-flex text-decoration-none mt-1">
              <i className="bi bi-house fs-4 text-black"></i>
              <span className="fs-4 d-none d-sm-inline text-black">Home</span>
            </Link>
            <ul className="nav nav-pills flex-column mt-4 text-start">
              <li className="nav-item">
                <NavLink
                  to="/Blogs"
                  className="t-btn"
                  onClick={() => setCategory("All")}
                >
                  <span className="fs-4 d-none d-sm-inline">All</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Blogs"
                  className="t-btn"
                  onClick={() => setCategory("Sci")}
                >
                  <span className="fs-4 d-none d-sm-inline">Science</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Blogs"
                  className="t-btn"
                  onClick={() => setCategory("It")}
                >
                  <span className="fs-4 d-none d-sm-inline">IT</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Blogs"
                  className="t-btn"
                  onClick={() => setCategory("Space")}
                >
                  <span className="fs-4 d-none d-sm-inline">Space</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-10">
          <nav className="container-fluid w-100 bg-light d-md-none">
            <div className="container-fluid">
              <Link to="/" className="fs-4 text-decoration-none  text-black">Home</Link>
              <div className="logandsign d-flex flex-row flex-lg-row justify-content-end align-items-center">
                <Link to="/Login" className="text-decoration-none login p-2 rounded-4 border-1px">Login</Link>
              </div>
              <ul className="d-flex justify-content-around horizontal-scroll">
                <li className="nav-item">
                  <NavLink
                    to="/Blogs"
                    className="t-btn"
                    onClick={() => setCategory("All")}
                  >
                    <span className="fs-4 d-none d-sm-inline">All</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Blogs"
                    className="t-btn"
                    onClick={() => setCategory("Sci")}
                  >
                    <span className="fs-4 d-none d-sm-inline">Science</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Blogs"
                    className="t-btn"
                    onClick={() => setCategory("It")}
                  >
                    <span className="fs-4 d-none d-sm-inline">IT</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Blogs"
                    className="t-btn"
                    onClick={() => setCategory("Space")}
                  >
                    <span className="fs-4 d-none d-sm-inline">Space</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <Outlet context={data} />
        </div>
      </div>
    </div>
  );
}

export default Viewblogs;
