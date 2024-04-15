import React from "react";
import "./viewblogs.css";
import { Link, NavLink, Outlet } from "react-router-dom";

function Viewblogs() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-2 vh-100 d-none d-md-block">
          <div className="">
            <Link to="/" className="d-flex text-decoration-none mt-1">
              <i className="bi bi-house fs-4 text-black"></i>
              <span className="fs-4 d-none d-sm-inline text-black">Home</span>
            </Link>
            <ul className="nav nav-pills flex-column mt-4 text-start">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-black" : ""}`
                  }
                  to="/Blogs"
                >
                  <span className="fs-4 d-none d-sm-inline">All</span>
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
                    <Link to="/Login"className='text-decoration-none login p-2 rounded-4 border-1px'>Login</Link>
                </div>
              <ul className=" container-fluid w-100 h-100 d-flex justify-content-around horizontal-scroll">
                <li className="nav-item">
                  <NavLink className="nav-links" to="/Blogs">
                    All
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Viewblogs;
