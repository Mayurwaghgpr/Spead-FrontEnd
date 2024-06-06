import React, { useEffect, useState ,useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import image from "../assets/siginimage.png";
import Usercontext from "../context/UserContext";

function MainNavBar() {
    const{user,isLogin,logout}=useContext(Usercontext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    console.log('isLogin', isLogin)
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-slate-600 w-100">
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
                                    {isLogin && <Link className="nav-link" to="/Blogs">Blogs</Link>}
                                </li>
                                <li className="nav-item mx-2">
                                   {isLogin&& <NavLink
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "text-black" : ""}`
                                        }
                                        to="/write"
                                    >
                                        <i className="bi bi-file-post"></i>
                                        <span className=" d-none d-sm-inline">Write</span>
                                    </NavLink>}
                                </li >
                                <li className="nav-item mx-2"><Link to='/test'>test</Link></li>

                            </ul>
                            {/* <form onSubmit={handelform}className="d-flex  mt-2 ms-5 me-0" role="search">
                    {hidden? null:<><input onChange={handeltext} className="form-control me-1 h-75" type="search" placeholder="Search" aria-label="Search" value={searchtxt}/>
                    <button className="btn btn-outline-red  h-75 pt-0" type="submit"></button></>}
                    </form>
                    <i onClick={handelhide} className="bi bi-search mt-2 mb-0 pb-0"></i> */}
                            {isLogin?
                            <div className="relative inline-block text-left">
                                <div>
                                    <button onClick={()=> setIsMenuOpen(prevState => !prevState)} type="button" className="inline-flex h-[50px] w-[50px] justify-center gap-x-1.5 p-1 bg-white text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 rounded-full" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            <img className=" rounded-full w-full h-full" src={image} alt={user.name} />
                                    </button>
                                </div>
                                {isMenuOpen&& <div className="absolute box-border -top-40 sm:top-14 right-3  mt-2 min-w-[150px] rounded-md before:w-[20px] before:absolute before:content-normal before:right-[5px] before:rotate-45 before:-top-[6px] before:rounded-r-lg before:bg-inherit  before:h-[20px]   border-dotted  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                        <div className="py-1" role="none">
                                           <p className="text-gray-700  border-b px-4 py-2 text-sm "> {user.email}</p>
                                            <Link className="text-gray-700 block px-4 border-b py-2 text-sm" to="/my-profile">Profile</Link>
                                            <a href="#" className="text-gray-700 block px-4 border-b py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Support</a>
                                            <a href="#" className="text-gray-700 block px-4 py-2 border-b text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">License</a>
                                        <button onClick={()=>{logout()}} type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</button>
                                    </div>
                                </div>}
                            </div>:<div className="logandsign d-flex flex-row flex-lg-row justify-content-center align-items-center me-4">
                                <Link to={'/Login'}  className='text-decoration-none px-3 border-1px'>LogIn</Link>
                                <Link to ={'/SignUp'}  className=' bg-black rounded-3xl p-2  text-white'>SingUp</Link>
                            </div>}
                        </div>

                    </div>

                </div>
            </nav>
            <Outlet />
        </div>
    );
}
export default MainNavBar;