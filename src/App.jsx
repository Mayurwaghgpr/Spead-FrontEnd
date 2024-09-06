import React, { useEffect, Suspense, lazy, useMemo, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MainNavBar from "./component/header/MainNavBar";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ToastContainer from "./component/otherUtilityComp/ToastContainer";
import ScrollToTopButton from "./component/otherUtilityComp/ScrollToTopButton";
import PersistentUser from "./utils/persistentUser";
import "bootstrap-icons/font/bootstrap-icons.css";
import Spiner from "./component/loaders/Spinner";
import { AnimatePresence } from "framer-motion";
import ForgotPass from "./pages/auth/ForgotPass";
import ResetPassword from "./pages/auth/ResetPassword";
import LoaderScreen from "./component/loaders/loaderScreen";
import ConfirmationBox from "./component/otherUtilityComp/ConfirmationBox";
import Theme from "./pages/settings/Theme";
import General from "./pages/settings/General";

// Lazy load components
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const ViewBlogs = lazy(() => import("./pages/ViewBlogs"));
const Home = lazy(() => import("./pages/Home"));
const PageError = lazy(() => import("./pages/ErrorPages/Page404"));
const Profile = lazy(() => import("./pages/userProfile/Profile"));
const DynamicPostEditor = lazy(() =>
  import("./pages/PostEditor/DynamicPostEditor")
);
const FullBlogView = lazy(() => import("./pages/FullBlogView/FullBlogView"));
const ProfileEditor = lazy(() => import("./pages/userProfile/ProfileEditor"));
const About = lazy(() => import("./pages/About"));
const ReadList = lazy(() => import("./pages/ReadList"));
const Settings = lazy(() => import("./pages/settings/settings"));

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.auth);
  const { ThemeMode } = useSelector((state) => state.ui);
  const [systemTheme, setSystemTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e) => {
      setSystemTheme(e.matches); // Update state when system theme changes
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    // Cleanup event listener when component unmounts
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  // Handle dark mode based on ThemeMode
  useMemo(() => {
    if (ThemeMode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ThemeMode", "dark");
    } else if (ThemeMode === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ThemeMode", "light");
    } else if (ThemeMode === "system") {
      if (systemTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [ThemeMode, systemTheme]);

  return (
    <>
      <ToastContainer />
      <PersistentUser />
      {<ConfirmationBox />}
      <AnimatePresence mode="wait">
        <MainNavBar />
        <Suspense fallback={<LoaderScreen />}>
          <Routes location={location} key={location.key || location.pathname}>
            <Route
              path="/"
              element={
                !isLogin ? (
                  <Home />
                ) : (
                  <ProtectedRoute>
                    <ViewBlogs />
                  </ProtectedRoute>
                )
              }
            />
            <Route
              path="/signin"
              element={!isLogin ? <SignIn /> : <Navigate to="/" replace />}
            />
            <Route
              path="/signup"
              element={!isLogin ? <SignUp /> : <Navigate to="/" replace />}
            />
            <Route path="/about" element={<About />} />

            <Route
              path="/profile/:username/:id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profileEditor"
              element={
                <ProtectedRoute>
                  <ProfileEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/write"
              element={
                <ProtectedRoute>
                  <DynamicPostEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            >
              <Route
                path=""
                element={
                  <ProtectedRoute>
                    <General />
                  </ProtectedRoute>
                }
              />
              <Route
                path="githubSynch"
                element={<ProtectedRoute>{<div></div>}</ProtectedRoute>}
              />
            </Route>
            <Route
              path="/FullView/:username/:id"
              element={
                <ProtectedRoute>
                  <FullBlogView />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageError />} />
            <Route path="/Read" element={<ReadList />} />
            <Route path="/ForgotPass" element={<ForgotPass />} />
            <Route path="/Resetpassword/:token" element={<ResetPassword />} />
          </Routes>
        </Suspense>
        <ConfirmationBox />
        <ScrollToTopButton />
      </AnimatePresence>
    </>
  );
}

export default App;
