import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../redux/slices/authSlice.js";
import { setErrNotify } from "../../redux/slices/uiSlice.js";
import googleicon from "../../assets/search.png";
import verify from "/verified.gif";

function SignUp() {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let SignUpRef = useRef();
  console.log("ref", SignUpRef);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validator, setValidator] = useState("");

  const handleInputChange = (e) => {
    setValidator("");
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const register = async () => {
    setValidator("");
    if (!signUpInfo.username || !signUpInfo.email || !signUpInfo.password) {
      return setValidator("Cannot send empty fields");
    }
    if (signUpInfo.password !== confirmPassword) {
      return setValidator("Passwords did not match");
    }
    if (SignUpRef.current === signUpInfo) {
      return;
    }
    SignUpRef.current = signUpInfo;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/auth/SignUp`,
        signUpInfo,
        { withCredentials: true }
      );
      if (response.data.AccessToken && response.status === 201) {
        setSuccess(true);
        dispatch(setIsLogin(true));
        setTimeout(() => {
          setSuccess(false);
          localStorage.setItem(
            "Admin profile",
            JSON.stringify(response.data.user)
          );
          localStorage.setItem("AccessToken", response.data.AccessToken);
          navigate("/blogs", { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      dispatch(
        setErrNotify({
          message: error.response.data.message + " " + error.message,
          status: true,
        })
      );
    }
  };

  return (
    <div className="sm:flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 backdrop-blur-md">
      <div className="w-full sm:hidden absolute">
        <button
          onClick={() => navigate("/")}
          className="text-black text-3xl absolute right-3"
        >
          <i className="bi bi-x-circle"></i>
        </button>
      </div>
      <div className="py-3 border-black border my-14 bg-white rounded-2xl min-w-[300px] sm:w-[600px]">
        <div className="w-full hidden sm:block relative">
          <button
            onClick={() => navigate("/")}
            className="text-black text-3xl absolute top-0 right-5"
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
        <h1 className="text-2xl text-center">Welcome to Spread..🖊️</h1>
        <h1 className="text-xl text-center m-4">Register</h1>
        <div className="flex flex-col justify-center w-full sm:flex-row">
          <div className="flex flex-col px-5 w-full items-center justify-center">
            <div className="mb-3 w-full">
              <input
                type="text"
                onChange={handleInputChange}
                name="username"
                className={`${
                  validator && !signUpInfo.username
                    ? "transition-transform duration-700 border-2 border-dashed border-red-400"
                    : "border-none"
                } focus:shadow-inner focus:shadow-slate-900 bg-gray-200 p-3 w-full rounded-full`}
                placeholder="Username"
                value={signUpInfo.username}
              />
              {validator && !signUpInfo.username ? (
                <span className="text-red-400">User Name is empty</span>
              ) : null}
            </div>
            <div className="mb-3 w-full">
              <input
                type="email"
                onChange={handleInputChange}
                name="email"
                className={`${
                  validator && !signUpInfo.email
                    ? "border-2 border-dashed border-red-400"
                    : "border-none"
                } focus:shadow-inner focus:shadow-slate-900 bg-gray-200 p-3 w-full rounded-full`}
                placeholder="Email"
                value={signUpInfo.email}
              />
              {validator && !signUpInfo.email ? (
                <span className="text-red-400">Email field is empty</span>
              ) : null}
            </div>
            <div className="mb-3 w-full flex flex-col">
              <input
                type="password"
                onChange={handleInputChange}
                name="password"
                className={`${
                  validator && !signUpInfo.password
                    ? "border-2 border-dashed border-red-400"
                    : "border-none"
                } focus:shadow-inner focus:shadow-slate-900 bg-gray-200 p-3 w-full rounded-full`}
                placeholder="Password"
                value={signUpInfo.password}
              />
              {validator && !signUpInfo.password ? (
                <span className="text-red-400">Password is empty</span>
              ) : null}
              <input
                type="password"
                onChange={handleConfirmPasswordChange}
                name="confirmPassword"
                className={`${
                  validator && !confirmPassword
                    ? "border-2 border-dashed border-red-400"
                    : "border-none"
                } focus:shadow-inner mt-2 focus:shadow-slate-900 bg-gray-200 p-3 w-full rounded-full`}
                placeholder="Confirm Password"
                value={confirmPassword}
              />
              <small className="text-red-500">
                {signUpInfo.password &&
                  confirmPassword &&
                  signUpInfo.password !== confirmPassword &&
                  "Passwords do not match"}
              </small>
              {validator && <span className="text-red-500">{validator}</span>}
            </div>
            <div className="mb-4 w-full flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-gray-600"
                name="rememberMe"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600"
              >
                <small>Remember me</small>
              </label>
            </div>
            <div className="mb-4 w-full">
              <button
                onClick={register}
                className="bg-blue-500 p-3 w-full text-center text-white rounded-full"
              >
                Sign Up
              </button>
            </div>
            <div className="mb-3 w-full text-center flex items-center">
              <hr className="flex-1" />
              <p className="mx-2">or</p>
              <hr className="flex-1" />
            </div>
            <div className="mb-4 w-full">
              <button className="bg-gray-200 flex items-center p-3 w-full justify-between text-sm rounded-full">
                <img src={googleicon} alt="Google Icon" className="h-6 mr-2" />
                <div className="w-full text-center">Continue with Google</div>
              </button>
            </div>
            <div className="text-center">
              <small>
                Already have an Account?{" "}
                <button
                  onClick={() => navigate("/Login", { replace: true })}
                  className="text-blue-500"
                >
                  Login
                </button>
              </small>
            </div>
          </div>
        </div>
      </div>
      {success && (
        <div className="backdrop-blur-sm fixed top-0 bottom-0 right-0 left-0 z-[100] flex justify-center items-center">
          <img
            className="w-[200px] bg-blend-multiply"
            src={verify}
            alt="Verification"
          />
        </div>
      )}
    </div>
  );
}

export default SignUp;
