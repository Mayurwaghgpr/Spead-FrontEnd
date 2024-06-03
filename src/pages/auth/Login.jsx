import React, { useState,useContext} from "react";
import googleicon from '../../assets/search.png';
import Listration1 from "../../assets/siginimage.png";
import Usercontext from "../../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Login(props) {
    const {setIsLogin}= useContext(Usercontext)
  
    const [LogIn, setLoginInfo] = useState({
        username: '',
        password: ''
    });
    const navigate =useNavigate()
    function handelLogin(e) {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function LoginUser() {
        try {
            // console.log(LogIn)
           const response= await axios.post('http://localhost:3000/Login', LogIn)
                    // console.log(response.data.token);
                    if (response.status == 200) {
                        const token = response.data.token
                        console.log(token)
                        localStorage.setItem('token',token)
                        setIsLogin(true)
                        navigate('/');
                    }
        } catch(error) {
                console.log(error);
                alert(error);
        }
    }

    return (
        <div className="relative sm:flex justify-center items-center  bg-transparent">
            <div className="w-full sm:hidden absolute"><button onClick={() => { navigate(-1) }} className=" text-black text-3xl absolute -top-12 right-3 text-shadow text-decoration-none"><i className="bi bi-x-circle"></i></button></div>
                <div className="sm:p-3 p-2 sm:mt-12 mt-14 bg-white rounded-2xl  sm:w-[600px] sm:h-[600px] ">
                    <div className="w-full hidden sm:block relative"><button onClick={() => { navigate(-1, {replace:true}) }} className=" text-black text-3xl absolute top-2 right-5 text-shadow text-decoration-none"><i className="bi bi-x-circle"></i></button></div>
                     <h1 className="text-2xl text-center flex justify-center items-center">Welcome to Spread..🖊️</h1>
                    <h1 className=" text-xl text-center">Login</h1>
                    <div className="flex w-full h-full sm:p-3 justify-center ">
                        <div className=" flex  flex-col p-5 justify-evenly w-full h-full">
                            <div className="mb-4">
                                <input type="text" onChange={handelLogin} name="username" className="bg-gray-200 p-3 w-full  rounded-full" placeholder="Username" value={LogIn.username} />
                            </div>
                            <div className="mb-3">
                                <input type="password" onChange={handelLogin} name="password" className="bg-gray-200 p-3 w-full  rounded-full" placeholder="Password" value={LogIn.password} />
                            </div>
                            <div className="mb-4 flex justify-between">
                                <div className="flex items-center">
                                    <input type="checkbox" className="form-checkbox text-gray-600" id="rememberCheck" />
                                    <label htmlFor="rememberCheck" className="ml-2 text-sm text-gray-600">Remember me</label>
                                </div>
                                <div className="forgot-pass">
                                    <small><Link to="">Forgot Password?</Link></small>
                                </div>
                            </div>
                            <div className="mb-4 ">
                                <button onClick={LoginUser} className="bg-blue-500 text-white p-3 w-full  rounded-full">Login</button>
                            </div>
                            <div className="mb-3 text-center grid grid-cols-3 items-center"> <hr  /> <p>or</p> <hr /> </div>
                            <div className="mb-3 ">
                                <button className="bg-gray-200 flex items-center p-3  w-full justify-between rounded-full"><img style={{ height: "24px" }} src={googleicon} alt="" className="h-6 mr-2" /> <div className="w-full text-center"> Continue with Google</div></button>
                            </div>
                            <div className="text-center">
                                <small>Don't have an Account?<button onClick={() => { navigate('/SignUp',{replace:true}) }} className="text-blue-500">SingUp</button> </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Login;
