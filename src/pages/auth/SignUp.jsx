import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../redux/slices/authSlice.js";
import { setToast } from "../../redux/slices/uiSlice.js";
import { useMutation, useQueryClient } from "react-query";
import { RegisterUser } from "../../Apis/authapi.jsx";
import CommonInput from "../../component/commonInput.jsx";
import { passwordRegex, emailRegex } from "../../utils/regex.js";
import OAuth from "./OAuth.jsx";
import { motion } from "framer-motion";

function SignUp() {
  const [validation, setValidation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, isError, error, mutate } = useMutation(RegisterUser, {
    onSuccess: (response) => {
      const { AccessToken } = response;
      dispatch(setIsLogin(true));
      queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      localStorage.setItem("AccessToken", AccessToken);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data.message || "Registration failed";
      dispatch(setToast({ message: errorMessage }));
    },
  });

  const signUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const signUpInfo = Object.fromEntries(formData);
    const { password, email } = signUpInfo;

    if (!passwordRegex.test(password)) {
      setValidation(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    if (!emailRegex.test(email)) {
      setValidation("Please enter a valid email address.");
      return;
    }
    mutate(signUpInfo);
  };

  const signUpInputs = [
    {
      type: "text",
      name: "username",
      labelname: "User Name",
      className: "mb-3 w-full flex flex-col gap-2",
    },
    {
      type: "email",
      name: "email",
      labelname: "Email",
      className: "mb-3 w-full flex flex-col gap-2",
    },
    {
      type: "password",
      name: "password",
      labelname: "Password",
      className: "mb-3 w-full flex flex-col gap-2",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="sm:flex relative justify-start z-10 h-screen items-center flex-col top-0 left-0 bottom-0 text-black right-0 overflow-scroll  bg-[#ffff]"
    >
      {(isError || validation) && (
        <div className="text-red-500 my-4 w-full flex justify-center bg-red-100 py-2">
          {error?.response?.data.message || validation}
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className=" text-3xl absolute top-0 p-4 right-3"
        aria-label="Close"
      >
        <i className="bi bi-x-lg"></i>
      </button>

      <div className="flex flex-col justify-tart gap-3 p-7 min-w-[300px] sm:w-[500px] rounded-xl bg-white ">
        <header className="text-2xl mt-2 text-center flex justify-center items-center">
          {"{...Spread}"}
        </header>

        <div className="flex flex-col justify- w-full px-5 ">
          <h1 className="text-2xl py-5 text-center font-medium">
            Create an account
          </h1>
          <form
            onSubmit={signUp}
            className="flex flex-col py-2 w-full items-center justify-start"
          >
            {signUpInputs.map((input) => (
              <CommonInput
                key={input.name}
                className={input.className}
                type={input.type}
                labelname={input.labelname}
                name={input.name}
                isLoading={isLoading}
              />
            ))}
            <div className="flex justify-start w-full">
              <CommonInput
                className={
                  "mb-4 flex flex-row-reverse justify-start  items-center gap-2 text-sm"
                }
                type={"checkbox"}
                labelname={"RemberMe"}
                label={"RemberMe"}
                in
              />
            </div>
            <div className="mb-4 w-full">
              <button
                type="submit"
                className="bg-slate-500 p-3 w-full text-center text-white rounded-lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
            <div className="mb-3 w-full text-center flex items-center">
              <hr className="flex-1" />
              <p className="mx-2">or</p>
              <hr className="flex-1" />
            </div>
            <div className="mb-4 w-full">
              <OAuth />
            </div>
            <footer className="text-center">
              <small>
                Already have an account?{" "}
                <Link to="/signin" replace={true} className="text-blue-500">
                  Sign In
                </Link>
              </small>
            </footer>
          </form>
        </div>
      </div>
    </motion.section>
  );
}

export default SignUp;
