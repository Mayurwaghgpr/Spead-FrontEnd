import React, { useState,useContext} from "react";
// import illestration from "../../assets/siginimage.png";
import Usercontext from "../../context/UserContext.jsx";
import googleicon from "../../assets/search.png";
import { Link ,redirect,useNavigate} from "react-router-dom";
import axios from 'axios';

function SignUP(props) {
    const {setIsLogIn}= useContext(Usercontext)
    const navigate =useNavigate()
    const [confirmPassword, setConfirmPassword] = useState('');
    const [SignUp, setSignUPInfo] = useState({
        username: '',
        email: '',
        password: ''
    });

    function handleConfirmPassword(e) {
        const { value } = e.target;
        if (value.trim() !== '') {
            setConfirmPassword(value);
        } else {
            setConfirmPassword('');
        }
    }

    function handelSignup(e) {
        const { name, value } = e.target;
        setSignUPInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    }

   async function Register () {
        if (SignUp.password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        } else {
           await axios.put('http://localhost:3000/Register',SignUp)
               .then(function (response) {
                   return response.data
               }).then(data=>{
                   if (data.token) {
                       localStorage.setItem('token', data.token);
                       setIsLogIn(true)
                        navigate('/Blogs') 
                   }    
                   
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <div className="relative sm:flex justify-center items-center  bg-transparent">
            <div className="w-full sm:hidden absolute"><button onClick={() => { navigate(-1) }} className=" text-black text-3xl absolute -top-12 right-3 text-shadow text-decoration-none"><i className="bi bi-x-circle"></i></button></div>
                <div className="sm:p-3 p-2 sm:mt-12 mt-14 bg-white rounded-2xl  sm:w-[600px] sm:h-[600px] ">
                    <div className="w-full hidden sm:block relative"><button onClick={() => { navigate(-1) }} className=" text-black text-3xl absolute top-2 right-5 text-shadow text-decoration-none"><i className="bi bi-x-circle"></i></button></div>
                     <h1 className="text-2xl text-center flex justify-center items-center">Welcome to Spread..🖊️</h1>
                    <h1 className=" text-xl text-center m-4">Register</h1>
                    <div className="flex flex-col justify-center w-full sm:flex-row">
                        <div className="flex flex-col p-2 items-center justify-center">
                            <div className="mb-4 flex justify-center">
                                <input type="text" onChange={handelSignup} name="username" className="bg-gray-200 p-2 sm:p-3 w-[300px] sm:w-[400px]  rounded-full" placeholder="Username" value={SignUp.username} />
                            </div>
                            <div className="mb-4 flex justify-center">
                                <input type="email" onChange={handelSignup} name="email" className="bg-gray-200 p-2 sm:p-3 sm:w-[400px] w-[300px]  rounded-full" placeholder="Email" value={SignUp.email} />
                            </div>
                            <div className="mb-4 flex flex-col justify-center items-center">
                                <input type="password" onChange={handelSignup} name="password" className="bg-gray-200 p-2 sm:p-3 mb-3 rounded-full sm:w-[400px] w-[300px]" placeholder="Password" value={SignUp.password} />
                                <input type="password" onChange={handleConfirmPassword} name="confirmPassword" className="bg-gray-200 p-2 sm:p-3 sm:w-[400px] w-[300px] mt-2 rounded-full" placeholder="Confirm Password" value={confirmPassword} />
                                <small className="text-red-500">{confirmPassword !== null  && SignUp.password !== confirmPassword && 'Passwords do not match'}</small>
                            </div>
                            <div className="mb-4">
                                <div className="flex w-[300px]">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" name="Password" />
                                    <label htmlFor="formCheck" className="ml-2 text-sm text-gray-600"><small>Remember me</small></label>
                                </div>
                            </div>
                            <div className="mb-4 flex justify-center">
                                <button onClick={Register} className="bg-blue-500 p-2 sm:p-3 sm:w-[400px] w-[300px] sm:h-full text-center text-white rounded-full">Sign Up</button>
                            </div>
                             <div className="mb-3 w-[300px] text-center grid grid-cols-3 items-center"> <hr/><p>or</p> <hr /> </div>
                            <div className="mb-4 flex justify-center">
                            <button className="bg-gray-200 flex items-center p-2 sm:p-3  sm:w-[400px] w-[300px] justify-between text-sm sm:text-lg rounded-full"><img style={{ height: "24px" }} src={googleicon} alt="" className="h-6 mr-2" /> <div className="w-full text-center"> Continue with Google</div></button>                            </div>
                            <div className="text-center">
                                <small>Already have an Account? <button onClick={() => { navigate('/Login',{replace:true}) }} className="text-blue-500">Login</button></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default SignUP;
