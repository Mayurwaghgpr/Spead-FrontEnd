import React,{useContext} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import ViewBlogs from './component/ViewBlogs';
import Home from './pages/Home';
import CreateBlog from './component/CreateBlog';
import PageError from './pages/PageError';
import MainNavBar from './component/MainNavBar';
import Profile from './pages/userProfile/Profile';
import PostPreview from './component/PostPreview';
// import ProtectedRoutes from './utils/ProtectedRoutes';
import Usercontext from "./context/UserContext";

function App() {
   const { isLogin } = useContext(Usercontext)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainNavBar />,
      errorElement: <PageError />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/write',
          children: [
            {
              path: '',
              element: isLogin? <CreateBlog />:<Login/>,
            },
          ],
        },
        {
          path: '/my-profile',
          children: [
            {
              path: '',
              element:isLogin? <Profile />:<Login/>,
            },
          ],
        },
   
      ],
    }, {
      path: '/blogs',
      element: <ViewBlogs />,
      children: [
        {
          path: '',
          element: isLogin ? <PostPreview /> : <Login />,
        },
      ],
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
