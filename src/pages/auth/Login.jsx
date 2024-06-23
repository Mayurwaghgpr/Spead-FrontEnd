import React, { useState, useContext } from "react";
import googleicon from "../../assets/search.png";
import UserContext from "../../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const { setIsLogin, isLogin } = useContext(UserContext);

  const [logIn, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loginUser() {
    if (logIn.password === "" && logIn.username) {
      setError("Cannot set empty inputs");
    } else if (logIn.password === "") {
      setError("Password cannot be empty");
    } else if (logIn.username === "") {
      setError("Please enter a username");
    } else {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/Login", logIn);
        if (response.status === 200) {
          const token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            setIsLogin(true);
            navigate("/blogs", { replace: true });
          }
        }
      } catch (error) {
        console.error(error);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  }

  if (!isLogin)
    return (
      <div className=" sm:flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 backdrop-blur-md">
        <div className="w-full sm:hidden absolute">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="text-black text-3xl absolute  right-3 text-shadow text-decoration-none"
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
        <div className="sm:p-3  border-black border  py-4 sm:mt-12 mt-14 bg-white rounded-2xl min-w-[300px] sm:w-[600px] ">
          <div className="w-full hidden sm:block relative">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="text-black text-3xl absolute top-2 right-5 text-shadow text-decoration-none"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          </div>
          <h1 className=" text-2xl  mb-6 text-center flex justify-center items-center">
            Welcome to Spread..🖊️
          </h1>
          <h1 className="text-xl text-center">Login</h1>
          <div className="flex w-full h-full sm:p-3 justify-center">
            <div className="flex flex-col p-5 justify-evenly w-full h-full">
              <div className="mb-4">
                <input
                  type="text"
                  onChange={handleLogin}
                  name="username"
                  className=" p-3 focus:shadow-inner outline-none focus:shadow-slate-900 bg-gray-200  w-full rounded-full"
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
                  className=" p-3 focus:shadow-inner outline-none focus:shadow-slate-900 bg-gray-200  w-full rounded-full"
                  placeholder="Password"
                  value={logIn.password}
                  disabled={loading}
                />
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="mb-4 min-w-[200px] flex justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-gray-600"
                    id="rememberCheck"
                  />
                  <label
                    htmlFor="rememberCheck"
                    className="ml-2  text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <div className="">
                  <small>
                    <Link to="">Forgot Password?</Link>
                  </small>
                </div>
              </div>
              <div className="mb-4">
                <button
                  onClick={loginUser}
                  className={`bg-blue-500 min-w-[200px]   text-white p-3 w-full rounded-full ${
                    loading && "cursor-wait bg-blue-100"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
              <div className="mb-3 text-center grid grid-cols-3 items-center">
                <hr /> <p>or</p> <hr />
              </div>
              <div className="mb-3">
                <button className="bg-gray-200 min-w-[200px]  flex items-center p-3 w-full justify-between rounded-full">
                  <img
                    style={{ height: "24px" }}
                    src={googleicon}
                    alt=""
                    className="h-6 mr-2"
                  />
                  <div className="w-full text-xs sm:text-inherit text-center">
                    Continue with Google
                  </div>
                </button>
              </div>
              <div className="text-center">
                <small>
                  Don't have an Account?{" "}
                  <button
                    onClick={() => {
                      navigate("/SignUp", { replace: true });
                    }}
                    className="text-blue-500"
                  >
                    SignUp
                  </button>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;
