import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import ViewBlogs from "./pages/ViewBlogs";
import Home from "./pages/Home";
import PageError from "./pages/ErrorPages/Page404";
import MainNavBar from "./component/header/MainNavBar";
import Profile from "./pages/userProfile/Profile";
import DynamicPostCreator from "./pages/WritePannel/DynamicPostCreator";
import FullBlogView from "./pages/FullBlogView/FullBlogView";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ProfileEditor from "./pages/userProfile/ProfileEditor";
import TostNotify from "./component/otherUtilityComp/TostNotify";
import ScrollToTopButton from "./component/otherUtilityComp/ScrollToTopButton";
import About from "./pages/About";
import PersistentUser from "./component/persistentUser";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  return (
    <>
      <TostNotify />
      <MainNavBar />
      <PersistentUser />
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Navigate to="/blogs" replace /> : <Home />}
        />
        <Route
          path="/signin"
          element={!isLogin ? <SignIn /> : <Navigate to="/blogs" replace />}
        />
        <Route
          path="/signup"
          element={!isLogin ? <SignUp /> : <Navigate to="/blogs" replace />}
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
          path="/blogs"
          element={
            <ProtectedRoute>
              <ViewBlogs />
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
      </Routes>
      <ScrollToTopButton />
    </>
  );
}

export default App;
