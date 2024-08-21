import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin } from "../../redux/slices/authSlice.js";
import { setToast } from "../../redux/slices/uiSlice.js";
import googleIcon from "../../assets/search.png";
import { useMutation, useQueryClient } from "react-query";
import { RegisterUser } from "../../Apis/authapi.jsx";
import CommonInput from "../../component/commonInput.jsx";
import { passwordRegex, emailRegex } from "../../utils/regex.js";

function SignUp() {
  const [validation, setValidation] = useState("");
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const { TostState } = useSelector((state) => state.ui);

  const { isLoading, isSuccess, mutate, isError, error } = useMutation(
    (SignUpInfo) => RegisterUser(SignUpInfo),
    {
      onSuccess: (response) => {
        const { AccessToken, user } = response;
        dispatch(setIsLogin(true));
        queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
        // dispatch(setUser(user));

        localStorage.setItem("AccessToken", true);
        // localStorage.setItem("userAccount", JSON.stringify(user));
        navigate("/", { replace: true });
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

    console.log(signUpInfo);
    mutate(signUpInfo);
  };

  const singupInputs = [
    {
      type: "text",
      name: "username",
      labelname: "User Name",
      className: ` mb-3 w-full`,
    },
    {
      type: "email",
      name: "email",
      labelname: "Email",
      className: `mb-3 w-full`,
    },
    {
      type: "password",
      name: "password",
      labelname: "Password",
      className: `mb-3 w-full`,
    },
  ];

  return (
    <section className="sm:flex justify-center z-10  h-screen  items-center flex-col fixed top-0 left-0 bottom-0 right-0 overflow-scroll bg-white">
      {isError ||
        (validation && (
          <div className="text-red-500 my-4 w-full flex justify-center  bg-red-100 py-2 ">
            {error?.response?.data.message || validation}!
          </div>
        ))}
      <div className="w-full top-0  absolute">
        <button
          onClick={() => navigate("/")}
          className="text-black text-3xl absolute right-3 text-shadow text-decoration-none"
          aria-label="Close"
        >
          <box-icon name="x"></box-icon>
        </button>
      </div>

      <div className="flex flex-col justify-evenly py-3 my-4  min-w-[300px] sm:w-[500px] h-full">
        <header className="text-2xl mt-2 text-center flex justify-center items-center">
          {"{...Spread}"}
        </header>

        <div className="flex flex-col justify-center w-full ">
          <h1 className="text-2xl py-5 text-center font-medium">
            Creat an account
          </h1>
          <form
            onSubmit={signUp}
            className="flex flex-col px-5 py-2 w-full items-center justify-center"
          >
            {singupInputs.map((input, idx) => (
              <CommonInput
                key={idx}
                className={input.className}
                type={input.type}
                labelname={input.labelname}
                name={input.name}
                isLoading={isLoading}
              />
            ))}

            <div className="mb-4 w-full flex items-center">
              <CommonInput
                className={"flex flex-row-reverse gap-2"}
                type={"checkbox"}
                labelname={"remberMe"}
                label={"RemberMe"}
              />
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
