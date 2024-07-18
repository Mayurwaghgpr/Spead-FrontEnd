import React, { useState } from "react";
import googleIcon from "../../assets/search.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUser } from "../../redux/slices/authSlice";
import { useLogInMutation } from "../../redux/slices/authApi";

function SignIn() {
  const { isLogin } = useSelector((state) => state.auth);
  const [logIn] = useLogInMutation();
  const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
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
    if (!loginInfo.username || !loginInfo.password) {
      setError("Username and password cannot be empty");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await logIn(loginInfo).unwrap();
      console.log("Response:", response); // Log the response

      const { AccessToken, user } = response;

      if (AccessToken) {
        dispatch(setIsLogin(true));
        dispatch(setUser(user));
        localStorage.setItem("AccessToken", AccessToken);
        localStorage.setItem("AdminProfile", JSON.stringify(user));
        navigate("/blogs", { replace: true });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error
      setError(error.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  if (!isLogin) {
    return (
      <section className="sm:flex justify-evenly items-center flex-col fixed top-0 left-0 bottom-0 right-0 backdrop-blur-[1.10px]">
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
        <div className="sm:p-3 py-4   rounded-2xl min-w-[300px] sm:w-[500px]">
          <div className="flex w-full h-full flex-col justify-center">
            <h1 className="text-2xl text-center font-semibold">Welcome</h1>
            <form className="flex flex-col px-5 py-4 justify-evenly w-full h-full">
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  onChange={handleLogin}
                  name="username"
                  className="p-3 focus:shadow-inner outline-none focus:shadow-slate-900 bg-gray-200 w-full rounded-lg"
                  placeholder="Username"
                  value={loginInfo.username}
                  disabled={loading}
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
                  onChange={handleLogin}
                  name="password"
                  className="p-3 focus:shadow-inner outline-none focus:shadow-slate-900 bg-gray-200 w-full  rounded-lg"
                  placeholder="Password"
                  value={loginInfo.password}
                  disabled={loading}
                  required
                />
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
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
                  onClick={loginUser}
                  className={`bg-blue-500 min-w-[200px] text-white p-3 w-full  rounded-lg ${
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
                  <button
                    onClick={() => navigate("/SignUp", { replace: true })}
                    className="text-blue-500"
                  >
                    Sign Up
                  </button>
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
