import React from "react";
import "./viewblogs.css";
import {Link,NavLink,Outlet} from "react-router-dom";

function Viewblogs(){
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-auto col-md-2 d-flex justify-content-start p-4  align-items-center flex-column gap-3 vh-100 blogs-sidebar shadow " >
                <NavLink className={({ isActive }) =>`text-decoration-none d-flex text-start w-auto ${isActive ? 'text-black' :''}`} to="/Blogs">S</NavLink>
                <NavLink className={({ isActive }) =>`text-decoration-none d-flex text-start w-auto ${isActive ? 'text-black' : ''}`} to="/Blogs/createblog">C</NavLink>
                </div>
                    <Outlet/>
            </div>
        </div>
         
    )
}

export default Viewblogs;