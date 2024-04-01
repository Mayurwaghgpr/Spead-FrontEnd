import React from "react";
import illestration from"../assets/images/siginimage.png"
import googleicon from "../assets/images/search.png"
function SignIn(){
    return( 
        <div className="container  d-flex flex-column justify-content-center align-items-center min-vh-100" tabIndex="-1">
            <p className="w-100"><a href="/" className="text-start text-black fs-1 text-shadow text-decoration-none"><i className="bi bi-house"></i></a></p>
           <h1 className="fs-3 mb-3">Welcome to blogger</h1>
            <div className="row rounded-5 p-3 bg-white shadow box-size box-area">
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{backgroundColor:"#f3ebe9"}}>
                    <div className="Signup-image mb-3">
                        <img className="img-fluid mx-auto d-block" src={illestration} alt={"Singup ilesstration"}/>
                        <p className="text-center">Lets Explore</p>
                        <small className="text-wrap text-center">Join community share your thought read Blogs and many more...</small>
                    </div>
                </div>
                <div className="col-md-6 right-box">
                
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                            
                            </div>
                            <div className="input-gruop d-flex gap-3 mb-3">
                                <input type="text" name="firstName" className="form-control form-control-lg bg-light fs-6"  placeholder="FirstName"/>
                                <input type="text" name="lastName" className="form-control form-control-lg bg-light fs-6"  placeholder="LastName"/>
                            </div>
                            <div className="input-gruop mb-3">
                                <input type="Email" name="Email" className="form-control form-control-lg bg-light fs-6"  placeholder="Email"/>
                            </div>
                            <div className="input-gruop mb-3">
                                <input type="password" name="Password" className="form-control form-control-lg bg-light fs-6"  placeholder="Password"/>
                            </div>
                            <div className="input-gruop mb-3 d-flex justify-content-between">
                                <div className="form-check">
                                <input type="checkbox" className="form-check-input" name="Password"  placeholder="Password"/>
                                <label htmlFor="formCheck"className="form-check-label text-secodary"><small>Remember me</small></label>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <button className=" btn btn-lg btn-primary w-100 fs-6">SignUp</button>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">or</div>
                            <div className="input-group mb-3">
                                <button className=" btn btn-lg btn-light d-flex gap-3 justify-content-center w-100 fs-6"><img height="24px"src={googleicon} alt="" /><small>Continue with Google</small></button>
                            </div>
                            <div className="row">
                                <small>Already have Account? <a href="/Login">Login</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
       
}
export default SignIn;