import React, { useState } from "react";
import illestration from "../assets/siginimage.png";
import googleicon from "../assets/search.png";
import { Link } from "react-router-dom";
import axios from 'axios';

function SignIn(props) {
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

    function Register() {
        if (SignUp.password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        } else {
            axios.post('http://localhost:3000/Register', SignUp)
                .then(function (response) {
                    alert(response.data.message);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    alert(error.response.data.error);
                });
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 fixed top-0 z-10 right-0 left-0 bottom-0">
            <div>
                <div className="flex justify-between items-center gap-50 w-100">
                    <p className=" p-3"><button onClick={props.onclose} className="text-end text-black text-3xl text-shadow text-decoration-none"><i class="bi bi-x-circle"></i></button></p>
                    <h1 className="text-3xl mb-3 me-5">Welcome to Blogger</h1>
                </div>
                <div className="max-w-2xl bg-white p-8 rounded-md shadow-md w-full sm:w-11/12 md:w-3/4 lg:w-[100%] xl:w-[100%]">
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/2">
                            <img className="w-full" src={illestration} alt={"Signup illustration"} />
                            <div className="mt-4">
                                <p className="text-lg font-semibold">Let's Explore</p>
                                <small className="text-sm text-gray-600">Join community, share your thoughts, read Blogs and many more...</small>
                            </div>
                        </div>
                        <div className="sm:w-1/2 pl-4">
                            <div className="mb-4">
                                <input type="text" onChange={handelSignup} name="username" className="bg-gray-200 p-3 w-full rounded-md" placeholder="Username" value={SignUp.username} />
                            </div>
                            <div className="mb-4">
                                <input type="email" onChange={handelSignup} name="email" className="bg-gray-200 p-3 w-full rounded-md" placeholder="Email" value={SignUp.email} />
                            </div>
                            <div className="mb-4">
                                <input type="password" onChange={handelSignup} name="password" className="bg-gray-200 p-3 w-full rounded-md" placeholder="Password" value={SignUp.password} />
                                <input type="password" onChange={handleConfirmPassword} name="confirmPassword" className="bg-gray-200 p-3 w-full mt-2 rounded-md" placeholder="Confirm Password" value={confirmPassword} />
                                <small className="text-red-500">{confirmPassword !== '' && SignUp.password !== confirmPassword && 'Passwords do not match'}</small>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center">
                                    <input type="checkbox" className="form-checkbox h-4 w-4 text-gray-600" name="Password" />
                                    <label htmlFor="formCheck" className="ml-2 text-sm text-gray-600"><small>Remember me</small></label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <button onClick={Register} className="bg-blue-500 text-white p-2 w-full rounded-md">Sign Up</button>
                            </div>
                            <div className="mb-4">
                                <button className="bg-gray-200 flex items-center p-2 w-full rounded-md"><img style={{ height: "24px" }} src={googleicon} alt="" /><small className="ml-2">Continue with Google</small></button>
                            </div>
                            <div className="text-center">
                                <small>Already have an Account? <Link to="/Login" className="text-blue-500">Login</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
