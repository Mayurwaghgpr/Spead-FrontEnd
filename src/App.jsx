import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Viewblogs from "./pages/ViewBlogs";
import Home from "./pages/Home";
import PageError from "./pages/PageError";
import MainNavBar from "./component/MainNavBar";
import Profile from "./pages/userProfile/Profile";
import PostPreview from "./component/PostPreview";
import UserContext from "./context/UserContext";
import WritePannel from "./pages/WritePannel/WriteEvn";
import FullBlogView from "./pages/FullBlogView/FullBlogView";
import ProtectedRoute from "./utils/ProtectedRoutes";
import ProfileEditor from "./pages/userProfile/ProfileEditor";

function App() {
  const { isLogin } = useContext(UserContext);

  return (
    <>
      <MainNavBar />
      <Routes>
        <Route
          path="/"
          element={!isLogin ? <Home /> : <Navigate to="/blogs" replace />}
        />
        {!isLogin && <Route path="/login" element={<Login />} />}
        {!isLogin && <Route path="/signup" element={<SignUp />} />}
        <Route
          path="/profile"
          element={
            isLogin ? (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" replace />
            )
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
            isLogin ? (
              <ProtectedRoute>
                <WritePannel />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" replace />
            )
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
        <Route path="/FullView" element={<FullBlogView />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </>
  );
}

export default App;
