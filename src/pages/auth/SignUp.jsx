import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../redux/slices/authSlice.js";
import { setToast } from "../../redux/slices/uiSlice.js";
import googleIcon from "../../assets/search.png";
import { useMutation, useQueryClient } from "react-query";
import { RegisterUser } from "../../Apis/authapi.jsx";

function SignUp() {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const { TostState } = useSelector((state) => state.ui);

  const { isLoading, isSuccess, mutate } = useMutation(
    (SignUpInfo) => RegisterUser(SignUpInfo),
    {
      onSuccess: (response) => {
        const { AccessToken, user } = response;
        dispatch(setIsLogin(true));
        // queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
        // dispatch(setUser(user));

        localStorage.setItem("AccessToken", true);
        // localStorage.setItem("userAccount", JSON.stringify(user));
        navigate("/blogs", { replace: true });
      },
      onError: (error) => {
        console.error("Error during registration:", error);
        dispatch(
          setToast({
            message: error.response.data.message || "Registration failed",
          })
        );
      },
    }
  );

  const signUp = async (e) => {
    e.preventDefault();

    const fromData = new FormData(e.target);
    const signUpInfo = Object.fromEntries(fromData);
    console.log(signUpInfo);
    mutate(signUpInfo);
  };

  return (
    <section className="sm:flex justify-center items-center flex-col fixed top-0 left-0 bottom-0 right-0 overflow-scroll bg-white">
      <div className="w-full top-0  absolute">
        <button
          onClick={() => navigate("/")}
          className="text-black text-3xl absolute right-3 text-shadow text-decoration-none"
          aria-label="Close"
        >
          <box-icon name="x"></box-icon>
        </button>
      </div>
      <header className="text-2xl mt-2 text-center flex justify-center items-center">
        {"{...Spread}"}
      </header>
      <div className="py-3 my-4  min-w-[300px] sm:w-[500px]">
        <h1 className="text-2xl text-center font-semibold">Creat an account</h1>
        <div className="flex flex-col justify-center w-full sm:flex-row">
          <form
            onSubmit={signUp}
            className="flex flex-col px-5 py-2 w-full items-center justify-center"
          >
            <div className="mb-3 w-full">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={` focus:shadow-inner focus:shadow-slate-900 bg-gray-200 p-3 w-full rounded-lg`}
                placeholder="Username"
              />
            </div>
            <div className="mb-3 w-full">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={` focus:shadow-inner focus:shadow-slate-900 bg-gray-200 p-3 w-full rounded-lg`}
                placeholder="Email"
              />
            </div>
            <div className="mb-3 w-full gap-2 flex flex-col">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                className={`focus:shadow-inner focus:shadow-slate-900 bg-gray-200 p-3 w-full rounded-lg`}
                placeholder="Password"
              />
            </div>
            <div className="mb-4 w-full flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="form-checkbox h-4 w-4 text-gray-600"
                name="rememberMe"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <div className="mb-4 w-full">
              <button
                type="submit"
                className="bg-slate-500 p-3 w-full text-center text-white rounded-lg"
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
              <button className="bg-gray-200 flex items-center p-3 w-full justify-between text-sm rounded-lg">
                <img src={googleIcon} alt="Google Icon" className="h-6 mr-2" />
                <span className="w-full text-center">Continue with Google</span>
              </button>
            </div>
            <footer className="text-center">
              <small>
                Already have an Account?{" "}
                <Link to={"/signin"} replace={true} className="text-blue-500">
                  SignIn
                </Link>
              </small>
            </footer>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
