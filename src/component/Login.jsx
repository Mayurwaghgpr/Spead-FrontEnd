import React from "react";
import googleicon from "../assets/search.png"
import Listration1 from "../assets/siginimage.png";
import { Link } from "react-router-dom";
function Login(){
    return(
           <div className="container-fluid d-flex flex-column justify-content-start align-items-center">
            <p className="w-100 p-3"><Link to="/" className=" text-black fs-1 text-shadow text-decoration-none"><i className="bi bi-house"></i></Link></p>
            <h1 className="fs-3 text-cente">Welcome to blogger</h1>
            <div className=" shadow box-size box-area">
                <div className="left-box" style={{backgroundColor:"#f3ebe9"}}>
                    <div className="Signup-image mb-3 p-3">
                        <img className="" src={Listration1} alt={"Singup ilesstration"}/>
                        <p>Lets Explore</p>
                        <small >Join community share your thought read Blogs and many more...</small>
                    </div>
                </div>
                    <div className="right-box">
                        <div className="container-r">
                            <div className="header-text">
                                <p>Hello,Again</p>
                                <p>Happy to have you back.</p>
                            </div>
                            <div className="">
                                <input type="text" name="Email" className="inp-ml fs-6"  placeholder="Email"/>
                            </div>
                            <div className="">
                                <input type="password" name="Password" className="inp-pss fs-6"  placeholder="Password"/>
                            </div>
                            <div className=" d-flex justify-content-between algin-items-center">
                                <div className="d-flex justify-content-between">
                                <input type="checkbox" className="" name="Password"  placeholder="Password"/>
                                <label htmlFor="formCheck"className="text-secodary"><small>Remember me</small></label>
                                </div>
                                <div className="forgot-pass">
                                    <small><Link to="">Forgot Password?</Link></small>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button className="login-btn fs-6">Login</button>
                            </div>
                            <div className="mb-3">
                                <button className="glog-btn d-flex gap-3 justify-content-center w-100 fs-6"><img height="24px"src={googleicon} alt="" /><small>SignUp with Google</small></button>
                            </div>
                            <div className="row">
                                <small>Don't have Account? <Link to="/SignIn">SignUp</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Login;