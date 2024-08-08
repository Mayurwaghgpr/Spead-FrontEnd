import React, { useState } from "react";
import googleIcon from "../../assets/search.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUser } from "../../redux/slices/authSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoginUser } from "../../Apis/authapi";

function SignIn() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLogin } = useSelector((state) => state.auth);

  const { isLoading, isSuccess, isError, mutate, error } = useMutation(
    (loginInfo) => LoginUser(loginInfo),
    {
      onSuccess: (response) => {
        const { AccessToken, user } = response;
        if (AccessToken) {
          dispatch(setIsLogin(true));
          queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
          // dispatch(setUser(user));

          localStorage.setItem("AccessToken", true);
          // localStorage.setItem("userAccount", JSON.stringify(user));
          navigate("/blogs", { replace: true });
        }
      },
    }
  );

  function handleLogin(e) {
    e.preventDefault();

    const fromData = new FormData(e.target);
    const obj = Object.fromEntries(fromData);
    console.log(obj);

    mutate(obj);
  }

  console.log(location.pathname);
  if (!isLogin) {
    return (
      <section
        className={`sm:flex justify-evenly h-full items-center flex-col fixed top-0 left-0 bottom-0 right-0 bg-white`}
      >
        {isError && (
          <div className="text-red-500 mb-4 w-full flex justify-center  ">
            {error?.message}!
          </div>
        )}
        <div className="w-full top-0  absolute">
          <button
            onClick={() => navigate("/")}
            className="text-black text-3xl absolute right-3 text-shadow text-decoration-none"
            aria-label="Close"
          >
            <box-icon name="x"></box-icon>
          </button>
        </div>
        <header className="text-2xl  text-center flex justify-center items-center">
          {"{...Spread}"}
        </header>
        <div
          className={`sm:p-3 py-4 opacity-0  rounded-2xl min-w-[300px] sm:w-[500px] transition-all duration-300 delay-150 ${
            location.pathname === "/signin" ? "opacity-100" : ""
          }`}
        >
          <div className="flex w-full h-full flex-col justify-center">
            <h1 className="text-2xl text-center font-semibold">Welcome</h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col px-5 py-4 justify-evenly w-full h-full"
            >
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="p-3 focus:shadow-inner outline-none focus:shadow-slate-900 bg-gray-200 w-full rounded-lg"
                  placeholder="Username"
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="p-3 focus:shadow-inner outline-none focus:shadow-slate-900 bg-gray-200 w-full  rounded-lg"
                  placeholder="Password"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="mb-4 min-w-[200px] flex justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberCheck"
                    className="form-checkbox text-gray-600"
                  />
                  <label htmlFor="rememberCheck" className="ml-2 text-gray-600">
                    Remember me
                  </label>
                </div>
                <div>
                  <small>
                    <Link to="">Forgot Password?</Link>
                  </small>
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className={`bg-slate-500 min-w-[200px] text-white p-3 w-full  rounded-lg ${
                    isLoading && "cursor-wait bg-blue-100"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Signin"}
                </button>
              </div>
              <div className="mb-3 text-center grid grid-cols-3 items-center">
                <hr /> <p>or</p> <hr />
              </div>
              <div className="mb-3">
                <button className="bg-gray-200 min-w-[200px] flex items-center p-3 w-full justify-between  rounded-lg">
                  <img
                    style={{ height: "24px" }}
                    src={googleIcon}
                    alt="Google Icon"
                    className="h-6 mr-2"
                  />
                  <span className="w-full text-xs sm:text-inherit text-center">
                    Continue with Google
                  </span>
                </button>
              </div>
              <footer className="text-center">
                <small>
                  Don't have an Account?{" "}
                  <Link to={"/SignUp"} replace={true} className="text-blue-500">
                    Sign Up
                  </Link>
                </small>
              </footer>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

export default SignIn;
