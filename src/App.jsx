import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Viewblogs from "./pages/ViewBlogs";
import Home from "./pages/Home";
import PageError from "./pages/Page404";
import MainNavBar from "./component/MainNavBar";
import Profile from "./pages/userProfile/Profile";
import PostPreview from "./component/PostPreview";
import WriteEvn from "./pages/WritePannel/WriteEvn";
import FullBlogView from "./pages/FullBlogView/FullBlogView";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ProfileEditor from "./pages/userProfile/ProfileEditor";
import { useDispatch, useSelector } from "react-redux";
import ErrorNotification from "./component/ErrorNotification";
import Notification from "./component/Notifiction";
import PostPreviewEditor from "./pages/WritePannel/component/PostPreviewEditor";

// import userStorage from "./userStorage";

function App() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <>
      <MainNavBar />
      <ErrorNotification />
      <Notification />
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Navigate to="/blogs" replace /> : <Home />}
        />
        <Route
          path="/login"
          element={!isLogin ? <Login /> : <Navigate to="/blogs" replace />}
        />
        <Route
          path="/signup"
          element={!isLogin ? <SignUp /> : <Navigate to="/blogs" replace />}
        />
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
              <WriteEvn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Viewblogs />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<PostPreview />} />
        </Route>
        <Route path="/test" element={<PostPreviewEditor />} />
        <Route path="/FullView/:username/:id" element={<FullBlogView />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
}

export default App;
