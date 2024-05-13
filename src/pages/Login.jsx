import React, { useState } from "react";
import googleicon from "../assets/search.png";
import Listration1 from "../assets/siginimage.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
    const [LogIn, setLoginInfo] = useState({
        username: '',
        password: ''
    });

    function handelLogin(e) {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function LoginUser() {
        axios.post('http://localhost:3000/Login', LogIn)
            .then(function (response) {
                console.log(response.status);
                alert(response.data);
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 fixed top-0 right-0 left-0 z-10 bottom-0">
            <div>
                <div className="flex justify-between items-center gap-50 w-100">
                <p className=" p-3"><button onClick={props.onclose} className="text-end text-black text-3xl text-shadow text-decoration-none"><i class="bi bi-x-circle"></i></button></p>
                <h1 className="text-3xl mb-3 me-5">Welcome to Blogger</h1>
                </div>
                <div className="max-w-2xl bg-white p-8 rounded-md shadow-md w-full sm:w-11/12 md:w-3/4 lg:w-[100%] xl:w-[100%]">
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/2">
                            <img className="w-full" src={Listration1} alt={"Signup illustration"} />
                            <div className="mt-4">
                                <p className="text-lg font-semibold">Let's Explore</p>
                                <small className="text-sm text-gray-600">Join community, share your thoughts, read Blogs and many more...</small>
                            </div>
                        </div>
                        <div className="sm:w-1/2 pl-4">
                            <div className="mb-4">
                                <input type="text" onChange={handelLogin} name="username" className="bg-gray-200 p-3 w-full rounded-md" placeholder="Username" value={LogIn.username} />
                            </div>
                            <div className="mb-3">
                                <input type="password" onChange={handelLogin} name="password" className="bg-gray-200 p-3 w-full rounded-md" placeholder="Password" value={LogIn.password} />
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" id="rememberCheck" />
                                    <label htmlFor="rememberCheck" className="ml-2 text-sm text-gray-600">Remember me</label>
                                </div>
                                <div className="forgot-pass">
                                    <small><Link to="">Forgot Password?</Link></small>
                                </div>
                            </div>
                            <div className="mb-4">
                                <button onClick={LoginUser} className="bg-blue-500 text-white p-2 w-full rounded-md">Login</button>
                            </div>
                            <div className="mb-3 text-center">or</div>
                            <div className="mb-3">
                                <button className="bg-gray-200 flex items-center p-2 w-full rounded-md"><img style={{ height: "24px" }} src={googleicon} alt="" className="h-6 mr-2" />Continue with Google</button>
                            </div>
                            <div className="text-center">
                                <small>Don't have an Account? <Link to="/SignUP" className="text-blue-500">Sign Up</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
