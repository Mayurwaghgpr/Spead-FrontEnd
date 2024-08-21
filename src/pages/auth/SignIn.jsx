import React, { useState } from "react";
import googleIcon from "../../assets/search.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUser } from "../../redux/slices/authSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoginUser } from "../../Apis/authapi";
import CommonInput from "../../component/commonInput";
import { passwordRegex } from "../../utils/regex";
import OAuth from "./OAuth";

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
          navigate("/", { replace: true });
        }
      },
    }
  );

  function handleLogin(e) {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const obj = Object.fromEntries(fromData);

    mutate(obj);
  }

  const singinInputs = [
    {
      className: "mb-4 flex flex-col gap-2",
      type: "text",
      name: "username",
      labelname: "UserName",
    },
    {
      className: "mb-4 flex flex-col gap-2",
      type: "password",
      name: "password",
      labelname: "Password",
    },
  ];

  if (!isLogin) {
    return (
      <section
        className={`sm:flex justify-evenly z-10 items-center h-screen flex-col fixed top-0 left-0 bottom-0 right-0 bg-white`}
      >
        {isError && (
          <div className="text-red-500 my-4 w-full flex justify-center  bg-red-100 py-2 ">
            {error?.response?.data.message}!
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

        <div
          className={`flex flex-col justify-evenly items-center  sm:p-3 py-4 opacity-0  rounded-2xl min-w-[300px] sm:w-[500px] h-full transition-all duration-300 delay-150 ${
            location.pathname === "/signin" ? "opacity-100" : ""
          }`}
        >
          <header className="text-2xl  text-center flex justify-center items-center">
            {"{...Spread}"}
          </header>
          <div className="flex w-full  flex-col justify-center">
            <h1 className="text-2xl text-center font-medium">Welcome</h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col px-5 py-4 justify-evenly w-full "
            >
              {singinInputs.map((input, idx) => (
                <CommonInput
                  key={idx}
                  className={input.className}
                  type={input.type}
                  name={input.name}
                  labelname={input.labelname}
                  isLoading={isLoading}
                  required
                />
              ))}
              <div className="mb-4 min-w-[200px] flex justify-between">
                <CommonInput
                  className={"mb-4 flex flex-row-reverse gap-2"}
                  type={"checkbox"}
                  labelname={"remberMe"}
                  label={"RemberMe"}
                />
                <div>
                  <small>
                    <Link to="">Forgot Password?</Link>
                  </small>
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className={`bg-slate-400 min-w-[200px] text-white p-3 w-full  rounded-lg ${
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
                <OAuth />
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
