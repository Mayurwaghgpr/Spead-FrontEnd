import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    // const[hidden,setHidden] = useState(true);
    // const [searchtxt,setSearchtext]=useState('')
    //    function handelhide(e){
    //     e.preventDefault();
    //        setHidden(prv=> prv? false:true);
    //    }
    //    function handeltext(el){
    //     let value = el.target.value;
    //     setSearchtext(value)
    //    }
    //    function handelform(e){
    //     e.preventDefault();
    //     let body=e.target
    //     console.log(body[0].value)
    //    }
    return (
        <nav className="navbar navbar-expand-lg bg-light w-100 position-fixed z-3">
            <div className="container-fluid">
                <a className="navbar-brand fs-4 ms-4" href="#">{"{...Spread}"}</a>
                <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="sidebar offcanvas offcanvas-end rounded-start-3" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    {/* <-----------sidebar-----header*/}
                    <div className="offcanvas-header border-bottom">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{"...Spread"}</h5>
                        <button type="button"
                            className="btn-close btn-close shadow-non"
                            data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    {/* <------sidebar-body---------> */}
                    <div className="offcanvas-body d-flex flex-lg-row flex-column z-3 p-4 p-lg-0" >

                        <ul className="navbar-nav  flex-grow-1 pe-3">
                            <li className="nav-item mx-2">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/Blogs">Blogs</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink
                                    className={({ isActive }) =>
                                        `nav-link ${isActive ? "text-black" : ""}`
                                    }
                                    to="/createblog"
                                >
                                    <i className="bi bi-file-post"></i>
                                    <span className=" d-none d-sm-inline">Create Blog</span>
                                </NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/">Link</Link>
                            </li>
                        </ul>
                        {/* <form onSubmit={handelform}className="d-flex  mt-2 ms-5 me-0" role="search">
                    {hidden? null:<><input onChange={handeltext} className="form-control me-1 h-75" type="search" placeholder="Search" aria-label="Search" value={searchtxt}/>
                    <button className="btn btn-outline-red  h-75 pt-0" type="submit"></button></>}
                    </form>
                    <i onClick={handelhide} className="bi bi-search mt-2 mb-0 pb-0"></i> */}
                        <div className="logandsign d-flex flex-row flex-lg-row justify-content-center align-items-center me-4">
                            <Link to="/Login" className='text-decoration-none px-3 border-1px'>Login</Link>
                            <Link to="/SignUP" className='SingIn  text-decoration-none px-3 py-1 rounded-4'><i className="bi bi-door-open-fill"></i>SignUp</Link>
                        </div>
                    </div>

                </div>

            </div>
        </nav>
    );
}
export default Navbar;