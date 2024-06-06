import React, { useState, useContext } from "react";
import googleicon from '../../assets/search.png';
import Listration1 from "../../assets/siginimage.png";
import UserContext from "../../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import ringloader from "system-regular-720-spinner-half-circles.gif"
function Login(props) {
    const { setIsLogin } = useContext(UserContext);
  
    const [logIn, setLoginInfo] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleLogin(e) {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    async function loginUser() {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:3000/Login', logIn);
            if (response.status === 200) {
                const token = response.data.token;
                if (token) {
                    localStorage.setItem('token', token);
                    setIsLogin(true);
                    navigate('/');
                }
            }
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your username and password.' + error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative sm:flex justify-center items-center bg-transparent">
            <div className="w-full sm:hidden absolute">
                <button onClick={() => { navigate(-1) }} className="text-black text-3xl absolute -top-12 right-3 text-shadow text-decoration-none">
                    <i className="bi bi-x-circle"></i>
                </button>
            </div>
            <div className="sm:p-3 p-2 sm:mt-12 mt-14 bg-white rounded-2xl sm:w-[600px] sm:h-[600px]">
                <div className="w-full hidden sm:block relative">
                    <button onClick={() => { navigate(-1) }} className="text-black text-3xl absolute top-2 right-5 text-shadow text-decoration-none">
                        <i className="bi bi-x-circle"></i>
                    </button>
                </div>
                <h1 className="text-2xl text-center flex justify-center items-center">Welcome to Spread..🖊️</h1>
                <h1 className="text-xl text-center">Login</h1>
                <div className="flex w-full h-full sm:p-3 justify-center">
                    <div className="flex flex-col p-5 justify-evenly w-full h-full">
                        <div className="mb-4">
                            <input 
                                type="text" 
                                onChange={handleLogin} 
                                name="username" 
                                className="bg-gray-200 p-3 w-full rounded-full" 
                                placeholder="Username" 
                                value={logIn.username} 
                                disabled={loading}
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                onChange={handleLogin} 
                                name="password" 
                                className="bg-gray-200 p-3 w-full rounded-full" 
                                placeholder="Password" 
                                value={logIn.password} 
                                disabled={loading}
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="mb-4 flex justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" className="form-checkbox text-gray-600" id="rememberCheck" />
                                <label htmlFor="rememberCheck" className="ml-2 text-sm text-gray-600">Remember me</label>
                            </div>
                            <div className="forgot-pass">
                                <small><Link to="">Forgot Password?</Link></small>
                            </div>
                        </div>
                        <div className="mb-4">
                            <button 
                                onClick={loginUser} 
                                className={`bg-blue-500 text-white p-3 w-full rounded-full ${loading && 'cursor-wait bg-blue-200'}`}
                                disabled={loading}
                            >
                                {loading && <img src="system-regular-720-spinner-half-circles.gif" alt="" /> }{loading ?'Logging in...' : 'Login'}
                            </button>
                        </div>
                        <div className="mb-3 text-center grid grid-cols-3 items-center">
                            <hr /> <p>or</p> <hr />
                        </div>
                        <div className="mb-3">
                            <button className="bg-gray-200 flex items-center p-3 w-full justify-between rounded-full">
                                <img style={{ height: "24px" }} src={googleicon} alt="" className="h-6 mr-2" />
                                <div className="w-full text-center">Continue with Google</div>
                            </button>
                        </div>
                        <div className="text-center">
                            <small>Don't have an Account? <button onClick={() => { navigate('/SignUp', { replace: true }) }} className="text-blue-500">SignUp</button></small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
