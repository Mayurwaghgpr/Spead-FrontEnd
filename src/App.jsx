import React, { useEffect, Suspense, lazy } from "react";
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
import TostNotify from "./component/otherUtilityComp/TostNotify";
import ScrollToTopButton from "./component/otherUtilityComp/ScrollToTopButton";
import PersistentUser from "./utils/persistentUser";
import "bootstrap-icons/font/bootstrap-icons.css";
import Spiner from "./component/loaders/Spinner";
import { AnimatePresence } from "framer-motion";
import ForgotPass from "./pages/auth/ForgotPass";
import ResetPassword from "./pages/auth/ResetPassword";

// Lazy load components
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const ViewBlogs = lazy(() => import("./pages/ViewBlogs"));
const Home = lazy(() => import("./pages/Home"));
const PageError = lazy(() => import("./pages/ErrorPages/Page404"));
const Profile = lazy(() => import("./pages/userProfile/Profile"));
const DynamicPostCreator = lazy(() =>
  import("./pages/WritePannel/DynamicPostCreator")
);
const FullBlogView = lazy(() => import("./pages/FullBlogView/FullBlogView"));
const ProfileEditor = lazy(() => import("./pages/userProfile/ProfileEditor"));
const About = lazy(() => import("./pages/About"));
const ReadList = lazy(() => import("./pages/ReadList"));
const Settings = lazy(() => import("./component/settings"));

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLogin } = useSelector((state) => state.auth);
  const LocalTheme = localStorage.getItem("ThemeMode");

  return (
    <>
      <TostNotify />
      <PersistentUser />
      <AnimatePresence mode="wait">
        <MainNavBar />
        <Suspense
          fallback={
            <div className=" flex bg-black justify-center items-center opacity-30  h-screen">
              <Spiner />
            </div>
          }
        >
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
                  <DynamicPostCreator />
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
            />
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
      </AnimatePresence>
      {<ScrollToTopButton />}
    </>
  );
}

export default App;
